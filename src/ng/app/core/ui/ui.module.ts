import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { ButtonModule } from 'primeng/button'
import { CardModule } from 'primeng//card'
import { ContextMenuModule } from 'primeng/contextmenu'
import { DialogModule } from 'primeng/dialog'
import { InputTextModule } from 'primeng/inputtext'
import { MenubarModule } from 'primeng/menubar'
import { PickListModule } from 'primeng/picklist'
import { ProgressSpinnerModule } from 'primeng/progressspinner'
import { SidebarModule } from 'primeng/sidebar'
import { TableModule } from 'primeng/table'
// import { ToastModule } from 'primeng/toast'
import { ToolbarModule } from 'primeng/toolbar'

@NgModule({
  exports: [
    ButtonModule,
    CardModule,
    CommonModule,
    ContextMenuModule,
    DialogModule,
    FormsModule,
    InputTextModule,
    MenubarModule,
    PickListModule,
    ProgressSpinnerModule,
    SidebarModule,
    TableModule,
    // ToastModule,
    ToolbarModule,
  ],
})
export class UiModule { }
