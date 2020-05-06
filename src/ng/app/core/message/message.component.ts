import { Component } from '@angular/core'

import { Message } from 'primeng/api'

import { MessageService } from './message.service'

@Component({
  selector: 'app-messages',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {

  constructor(
    private messageService: MessageService,
  ) { }

  get messages() {
    return this.messageService.messages
  }

  set messages(messages: Message[]) {
    this.messageService.messages = messages
  }

}
