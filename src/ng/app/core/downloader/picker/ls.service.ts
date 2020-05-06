import { Injectable } from '@angular/core'

import { File } from '../file'
import { IpcService } from '../../ipc/ipc.service'
import { MessageService } from '../../message/message.service'

@Injectable({
  providedIn: 'root'
})
export class LsService {

  direction = 'desc'
  orderBy = 'mtime'

  constructor(
    private ipcService: IpcService,
    private messageService: MessageService,
  ) { }

  /**
   * List the files available for download in the directory.
   *
   * The IPC invokes the `ls $dir` remote command request.
   */
  async listFiles(dir: string) {
    this.messageService.add(
      `ls ${dir}`,
      'Invoke',
      'info'
    )
    let data = []
    try {
      const response = await this.ipcService.invoke('remote-command-request', {
        procedure: 'ls',
        args: [dir, this.orderBy, this.direction],
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

  /**
   * Sort by name ascending. If already sorted by name, change the direction.
   */
  toggleSortByName() {
    if (this.orderBy === 'name') {
      this.toggleDirection()
    } else {
      this.orderBy = 'name'
      this.direction = 'asc'
    }
  }

  /**
   * Sort by time descending. If already sorted by time, change the direction.
   */
  toggleSortByTime() {
    if (this.orderBy === 'mtime') {
      this.toggleDirection()
    } else {
      this.orderBy = 'mtime'
      this.direction = 'desc'
    }
  }

  /**
   * Alternate the sort direction between asc and desc.
   */
  private toggleDirection() {
    this.direction = this.direction === 'asc' ? 'desc' : 'asc'
  }

}
