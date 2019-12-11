import { File } from './file'

export class Download {
  starttime: Date
  endtime: Date
  file: File

  constructor(file: File) {
    this.file = file
  }

  /**
   * Return whether the download is queued, downloading, or complete.
   */
  status() {
    if ( ! this.starttime) {
      return 'queued'
    } else if ( ! this.endtime) {
      return 'downloading'
    } else {
      return 'complete'
    }
  }

}
