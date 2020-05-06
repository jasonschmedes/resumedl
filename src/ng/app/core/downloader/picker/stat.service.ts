import { Injectable } from '@angular/core'
import * as filesize from 'filesize'

import { IpcService } from '../../ipc/ipc.service'

@Injectable({
  providedIn: 'root'
})
export class StatService {

  constructor(
    private ipcService: IpcService,
  ) { }

  /**
   * Get the filesize of a file.
   *
   * The IPC invokes the `stat $path` remote command request.
   */
  async size(path: string) {
    let bytes = 0
    try {
      const response = await this.ipcService.invoke('remote-command-request', {
        procedure: 'stat',
        args: [path],
      })
      bytes = JSON.parse(response).size
    } catch (e) {
      console.log(e)
    }

    return { size: bytes, human: filesize(bytes) }
  }

}
