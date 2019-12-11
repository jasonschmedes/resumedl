import { Injectable } from '@angular/core'
import { IpcRenderer } from 'electron'

@Injectable({
  providedIn: 'root'
})
export class IpcService {
  private ipc: IpcRenderer | undefined = void 0

  /**
   * Communicate with the main process.
   *
   * See ipcRenderer details at <https://electronjs.org/docs/api/ipc-renderer>.
   */
  constructor() {
    if ((window as any).require) {
      try {
        this.ipc = (window as any).require('electron').ipcRenderer
      } catch (e) {
        throw e
      }
    } else {
      console.warn('Electron IPC was not loaded')
    }
  }

  /**
   * Listen on a channel.
   *
   * Call `listener(event, args...)` on messages from IpcMain.
   */
  public on(channel: string, listener: any): void {
    if ( ! this.ipc) {
      return
    }

    this.ipc.on(channel, listener)
  }

  /**
   * Send a message to the main process asynchronously via channel.
   *
   * Arguments will be serialized as JSON internally and hence no functions or
   * prototype chain will be included.
   */
  public send(channel: string, ...args): void {
    if ( ! this.ipc) {
      return
    }
    this.ipc.send(channel, ...args)
  }

  /**
   * Send an async message to the main process and expect an async result.
   *
   * Arguments will be serialized as JSON internally and hence no functions or
   * prototype chain will be included.
   */
  public async invoke(channel: string, ...args): Promise<any> {
    if ( ! this.ipc) {
      return
    }
    return await this.ipc.invoke(channel, ...args)
  }
}
