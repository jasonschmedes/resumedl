import { Component } from '@angular/core'

import { Download } from '../download'
import { DownloaderService } from '../downloader.service'
// import { MessageService } from '../../message/message.service'

@Component({
  selector: 'app-downloader-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent {

  constructor(
    private downloaderService: DownloaderService,
    // private messageService: MessageService,
  ) { }

  get history() {
    return this.downloaderService.history()
  }

  get download() {
    return this.downloaderService.current()
  }

  elapsed(dl: Download) {
    const ms = dl.endtime.getTime() - dl.starttime.getTime()
    const diff = new Date(0, 0, 0, 0, 0, 0)
    diff.setMilliseconds(ms)

    return diff
  }

}
