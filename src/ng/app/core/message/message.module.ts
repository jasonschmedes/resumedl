import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import {
  MessageModule as PrimeNgMessageModule
} from 'primeng/message'
import {
  MessagesModule as PrimeNgMessagesModule
} from 'primeng/messages'

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
