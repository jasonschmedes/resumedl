import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { ButtonModule } from 'primeng/components/button/button'
import { CardModule } from 'primeng/components/card/card'
// import { DialogModule } from 'primeng/components/dialog/dialog'
import { InputTextModule } from 'primeng/components/inputtext/inputtext'
import { PickListModule } from 'primeng/components/picklist/picklist'
import { ProgressSpinnerModule } from 'primeng/components/progressspinner/progressspinner'
import { SidebarModule } from 'primeng/components/sidebar/sidebar'
import { TableModule } from 'primeng/components/table/table'
// import { ToastModule } from 'primeng/components/toast/toast'
import { ToolbarModule } from 'primeng/components/toolbar/toolbar'

// import { CalendarModule } from 'primeng/components/calendar/calendar'
// import { CheckboxModule } from 'primeng/components/checkbox/checkbox'
// import { ChipsModule } from 'primeng/components/chips/chips'
// import { DropdownModule } from 'primeng/components/dropdown/dropdown'
// import { InputMaskModule } from 'primeng/components/inputmask/inputmask'
// import { InputTextModule } from 'primeng/components/inputtext/inputtext'
// import {
//   SelectButtonModule,
// } from 'primeng/components/selectbutton/selectbutton'
// import { SliderModule } from 'primeng/components/slider/slider'
// import { SpinnerModule } from 'primeng/components/spinner/spinner'

@NgModule({
  exports: [
    ButtonModule,
    // CheckboxModule,
    CardModule,
    CommonModule,
    // DialogModule,
    // DropdownModule,
    FormsModule,
    // InputMaskModule,
    InputTextModule,
    // SelectButtonModule,
    PickListModule,
    ProgressSpinnerModule,
    SidebarModule,
    TableModule,
    // ToastModule,
    ToolbarModule,
  ],
})
export class UiModule { }
