import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

// import { MessageService } from '../../message/message.service'
import { StoreService } from '../../store/store.service'

@Component({
  selector: 'app-downloader-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit {

  downloadsComplete: string
  downloadsPartials: string

  transportUsername: string
  transportHost: string
  transportPort: number
  transportPrivateKey: string

  @Input() visible: boolean
  @Output() visibleChange = new EventEmitter<boolean>()

  constructor(
    // private messageService: MessageService,
    private storeService: StoreService,
  ) { }

  ngOnInit() {
    this.load()
  }

  hide() {
    this.save()
    this.visibleChange.emit(false)
  }

  async load() {
    const store = await this.storeService.load()
    this.reload(store)
  }

  save() {
    const store = this.current()
    this.storeService.save(store)
  }

  current() {
    return {
      transport: {
        username: this.transportUsername,
        host: this.transportHost,
        port: this.transportPort,
        privateKey: this.transportPrivateKey,
      },
      downloads: {
        complete: this.downloadsComplete,
        partials: this.downloadsPartials,
      },
    }
  }

  reload(store: any) {
    if ( ! store) {
      return null
    }

    if (store.transport) {
      this.transportUsername = store.transport.username
      this.transportHost = store.transport.host
      this.transportPort = store.transport.port
      this.transportPrivateKey = store.transport.privateKey
    }

    if (store.downloads) {
      this.downloadsComplete = store.downloads.complete
      this.downloadsPartials = store.downloads.partials
    }
  }

}
