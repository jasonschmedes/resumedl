import { Component, EventEmitter, OnInit, Output } from '@angular/core'

import { DownloaderService } from '../downloader.service'
import { File } from '../file'
import { IpcService } from '../../ipc/ipc.service'
import { MessageService } from '../../message/message.service'
import { StoreService } from '../../store/store.service'

@Component({
  selector: 'app-downloader-picker',
  templateUrl: './picker.component.html',
  styleUrls: ['./picker.component.scss']
})
export class PickerComponent implements OnInit {

  available: File[] = []
  disabled: boolean
  @Output() download = new EventEmitter<boolean>()
  dragdrop: boolean
  listPath: string
  queued: File[] = []
  showSourceControls: boolean
  showTargetControls: boolean

  constructor(
    private downloaderService: DownloaderService,
    private ipcService: IpcService,
    private messageService: MessageService,
    private storeService: StoreService,
  ) { }

  async ngOnInit() {
    this.reset()
    this.listPath = await this.storeService.lookup('listPath')
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

  get downloading() {
    return this.downloaderService.current() ? true : false
  }

  async handleClickList() {
    this.reset()
    this.available = []
    this.storeService.keep('listPath', this.listPath)
    this.available = await this.listFiles()
  }

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

  async stop() {
    const download = await this.downloaderService.stop()
    this.download.emit(false) // Notify the parent of the stop download.
    if (download) {
      this.queued.unshift(download.file)
    }
  }

  /**
   * List the files available for download in the directory.
   *
   * The IPC invokes the `ls $dir` remote command request.
   */
  async listFiles() {
    this.messageService.add(
      `ls ${this.listPath}`,
      'Invoke',
      'info'
    )
    let data = []
    try {
      const response = await this.ipcService.invoke('remote-command-request', {
        procedure: 'ls',
        args: [this.listPath],
      })
      data = JSON.parse(response)
    } catch (e) {
      console.log(e)
      this.messageService.add(
        `Cannot retrieve the file list.`,
        'Filepicker Error',
        'error'
      )
    }

    return data.map((filename: string) => new File(filename))
  }

}
