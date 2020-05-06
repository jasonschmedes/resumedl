import {Component, Input, OnInit } from '@angular/core'
import { MenuItem } from 'primeng/api'

import { BrowserService } from '../browser.service'
import { File } from '../../file'
import { StatService } from '../stat.service'

@Component({
  selector: 'app-downloader-picker-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class RowComponent implements OnInit {

  @Input() file: File

  menu: MenuItem[]
  details = false
  size: any

  constructor(
    private browserService: BrowserService,
    private statService: StatService,
  ) { }

  ngOnInit() {
    this.menu = [
      {
        label: 'Browse',
        icon: 'pi pi-folder-open',
        command: () => {
          this.browserService.browse(this.file.path)
        },
        disabled: ! this.file.directory(),
      },
      {
        label: 'Details',
        icon: 'pi pi-info',
        command: async () => {
          if ( ! this.size) {
            this.size = await this.stat(this.file.path)
          }
          this.details = true
        },
      },
    ]
  }

  async stat(file: string) {
    const size = await this.statService.size(file)
    return size
  }

}
