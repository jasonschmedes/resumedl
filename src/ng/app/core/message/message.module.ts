import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import {
  MessageModule as PrimeNgMessageModule
} from 'primeng/components/message/message'
import {
  MessagesModule as PrimeNgMessagesModule
} from 'primeng/components/messages/messages'

import { MessageComponent } from './message.component'

@NgModule({
  imports: [
    CommonModule,
    PrimeNgMessageModule,
    PrimeNgMessagesModule,
  ],
  declarations: [
    MessageComponent,
  ],
  exports: [
    MessageComponent,
    PrimeNgMessageModule,
    PrimeNgMessagesModule,
  ],
})
export class MessageModule { }
