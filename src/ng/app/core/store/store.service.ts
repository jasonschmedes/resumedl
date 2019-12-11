import { Injectable } from '@angular/core'

import { IpcService } from '../ipc/ipc.service'
import { MessageService } from '../message/message.service'

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(
    private ipcService: IpcService,
    private messageService: MessageService,
  ) { }

  async load() {
    const store = await this.ipcService.invoke('load-store')

    // this.messageService.add(
    //   `Loaded preferences.`,
    //   'Store',
    //   'success'
    // )

    console.log('Loading preferences', store)

    return store
  }

  async save(store: any) {
    console.log('saving preferences', store)
    await this.ipcService.invoke('save-store', store)
    this.messageService.add(
      `Saved preferences.`,
      'Store',
      'success'
    )
  }

  async keep(key: string, value: any) {
    console.log('keeping session value', key, value)
    await this.ipcService.invoke('save-session', key, value)
  }

  async lookup(key: string) {
    const value = await this.ipcService.invoke('load-session', key)
    console.log('looking up a session value', key, value)

    return value
  }
}
