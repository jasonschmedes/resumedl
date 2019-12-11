import { Component, Input } from '@angular/core'

import { File } from '../../file'

@Component({
  selector: 'app-downloader-picker-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class RowComponent {

  @Input() file: File

}
