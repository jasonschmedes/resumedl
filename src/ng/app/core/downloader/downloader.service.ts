import { Injectable } from '@angular/core'

import { Download } from './download'
import { File } from './file'
import { IpcService } from '../ipc/ipc.service'
import { MessageService } from '../message/message.service'

@Injectable({
  providedIn: 'root'
})
export class DownloaderService {
  private downloading: Download
  private downloaded: Download[] = []
  public processing = false

  constructor(
    private ipcService: IpcService,
    private messageService: MessageService,
  ) { }

  /**
   * The download procedure for an individual file.
   */
  async download(file: File) {
    this.processing = true
    let status = false
    if (this.downloading) {
      this.messageService.add(
        `A download is already in progress.`,
        'Downloader',
        'error'
      )
      return false
    }

    this.downloading = new Download(file)
    this.messageService.add(
      `dl ${file.path}`,
      'Invoke',
      'info'
    )
    try {
      this.messageService.add(
        `Downloading ${file.name}.`,
        'Downloader',
        'info'
      )
      this.downloading.starttime = new Date()
      status = await this.ipcService.invoke('remote-command-request', {
        procedure: 'dl',
        args: [file.path],
      })
      if (status && this.downloading) {
        this.downloading.endtime = new Date()
        this.downloaded.push(this.downloading)
        this.downloading = null
      }
    } catch (e) {
      console.log(e)
      this.messageService.add(
        `Failed to download the file.`,
        'Downloader',
        'error'
      )
    }

    return status
  }

  current() {
    return this.downloading
  }

  history() {
    return this.downloaded
  }

  async stop() {
    let current = this.downloading
    this.processing = false
    if (current) {
      try {
        await this.ipcService.invoke('stop-download')
        this.downloading = null
      } catch (e) {
        console.log('Could not stop the download', e)
        current = null
      }
    }

    return current
  }
}
