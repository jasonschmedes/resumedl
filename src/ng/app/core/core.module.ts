import { NgModule, Optional, SkipSelf } from '@angular/core'

import { CoreComponent } from './core.component'
// import { FilePickerModule } from './filepicker/filepicker.module'
import { DownloaderModule } from './downloader/downloader.module'
import { MessageModule } from './message/message.module'
import { throwIfAlreadyLoaded } from './module-import-guard'


@NgModule({
  imports: [
    // FilePickerModule,
    DownloaderModule,
    MessageModule,
  ],
  declarations: [
    CoreComponent,
  ],
  exports: [
    CoreComponent,
  ],
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule')
  }
}
