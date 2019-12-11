import { Component } from '@angular/core'

@Component({
  selector: 'app-downloader',
  templateUrl: './downloader.component.html',
  styleUrls: ['./downloader.component.scss']
})
export class DownloaderComponent {

  picker = true
  status = false
  preferences = false

  togglePicker() {
    this.picker = ! this.picker
    if ( ! this.picker && ! this.status) {
      this.status = true
    }
  }

  toggleStatus() {
    this.status = ! this.status
    if ( ! this.status && ! this.picker) {
      this.picker = true
    }
  }

  showStatus() {
    this.status = true
  }
}
