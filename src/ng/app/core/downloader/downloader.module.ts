import { NgModule } from '@angular/core'

import { DownloaderComponent } from './downloader.component'
import { MessageModule } from '../message/message.module'
import { PreferencesComponent } from './preferences/preferences.component'
import { PickerComponent } from './picker/picker.component'
import { RowComponent } from './picker/row/row.component'
import { StatusComponent } from './status/status.component'
import { UiModule } from '../ui/ui.module'


@NgModule({
  imports: [
    MessageModule,
    UiModule,
  ],
  declarations: [
    DownloaderComponent,
    PreferencesComponent,
    PickerComponent,
    RowComponent,
    StatusComponent,
  ],
  exports: [
    DownloaderComponent,
  ],
})
export class DownloaderModule { }
