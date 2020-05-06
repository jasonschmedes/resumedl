import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { MenuItem } from 'primeng/api'


import { BrowserService } from './browser.service'
import { DownloaderService } from '../downloader.service'
import { File } from '../file'
import { LsService } from './ls.service'
import { MessageService } from '../../message/message.service'
import { StoreService } from '../../store/store.service'

@Component({
  selector: 'app-downloader-picker',
  templateUrl: './picker.component.html',
  styleUrls: ['./picker.component.scss']
})
export class PickerComponent implements OnInit {

  available: File[] = []
  buttons: MenuItem[] = []
  disabled: boolean
  @Output() download = new EventEmitter<boolean>()
  dragdrop: boolean
  listPath: string
  queued: File[] = []
  showSourceControls: boolean
  showTargetControls: boolean

  constructor(
    private browserService: BrowserService,
    private downloaderService: DownloaderService,
    private lsService: LsService,
    private messageService: MessageService,
    private storeService: StoreService,
  ) { }

  ngOnInit() {
    this.reset()
    this.browserService.path.subscribe(path => {
      console.log('Observed path change: ', path)
      if (path) {
        this.listPath = path
        this.handleClickList()
      }
    })

    this.buildButtons()
  }

  /**
   * Dynamically create the menu buttons depending on the current state.
   */
  private buildButtons() {
    let nameSortIcon = 'pi pi-sort-alt'
    let timeSortIcon = 'pi pi-clock'

    if (this.lsService.orderBy === 'name') {
      nameSortIcon = this.lsService.direction === 'desc' ? 'pi pi-sort-alpha-down-alt' : 'pi pi-sort-alpha-down'
    } else if (this.lsService.orderBy === 'mtime') {
      timeSortIcon = this.lsService.direction === 'desc' ? 'pi pi-directions-alt' : 'pi pi-directions'
    }

    this.buttons = [
      {
        title: 'Back',
        icon: 'pi pi-chevron-circle-left',
        command: () => { this.browserService.backward() },
      },
      {
        title: 'Up',
        icon: 'pi pi-chevron-circle-up',
        command: () => { this.browserService.up() },
      },
      {
        title: 'Forward',
        icon: 'pi pi-chevron-circle-right',
        command: () => { this.browserService.forward() },
      },
      {
        separator: true,
      },
      {
        title: 'Sort By Name',
        icon: nameSortIcon,
        command: () => {
          this.lsService.toggleSortByName()
          this.handleClickList()
          this.buildButtons()
        },
      },
      {
        title: 'Sort By Time',
        icon: timeSortIcon,
        command: () => {
          this.lsService.toggleSortByTime()
          this.handleClickList()
          this.buildButtons()
        },
      },
    ]
  }

  reset() {
    this.disabled = false
    this.dragdrop = true
    this.showSourceControls = false
    this.showTargetControls = false
  }

  disable() {
    this.disabled = true
    this.dragdrop = false
    this.showSourceControls = false
    this.showTargetControls = false
  }

  enable() {
    this.disabled = false
    this.dragdrop = true
    this.showSourceControls = false
    this.showTargetControls = false
  }

  /**
   * True if a download is in progress. False otherwise.
   */
  get downloading() {
    return this.downloaderService.current() ? true : false
  }

  /**
   * List the files for the directory in the specified sort order.
   */
  async handleClickList() {
    this.reset()
    this.available = []
    this.storeService.keep('listPath', this.listPath)
    this.available = await this.lsService.listFiles(this.listPath)
  }

  /**
   * Start processing the download queue.
   */
  async start() {
    if (this.queued.length === 0) {
      this.messageService.add(
        `All downloads have finished.`,
        'Filepicker',
        'success'
      )

      return true
    }

    this.download.emit(true) // notify the parent of the start download

    const file = this.queued.shift()
    const status = await this.downloaderService.download(file)
    if ( ! status) { // The download failed so put the file at top of queue.
      this.queued.unshift(file)
    }
    if (this.downloaderService.processing) { // Continue processing the queue.
      this.start()
    }
  }

  /**
   * Kill the download process.
   */
  async stop() {
    const download = await this.downloaderService.stop()
    this.download.emit(false) // Notify the parent of the stop download.
    if (download) {
      this.queued.unshift(download.file)
    }
  }

}
