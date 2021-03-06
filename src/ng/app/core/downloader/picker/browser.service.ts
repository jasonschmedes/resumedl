import { Subject } from 'rxjs'
import { Injectable } from '@angular/core'
import * as nodePath from 'path'

// import { MessageService } from '../../message/message.service'

@Injectable({
  providedIn: 'root'
})
export class BrowserService {
  public path: Subject<string> = new Subject()

  private history: string[] = []
  private pointer = 0

  constructor(
    // private messageService: MessageService,
  ) { }

  /**
   * Move the pointer back one and change to that directory if there's history.
   */
  backward() {
    if (this.pointer > 0) {
      this.pointer -= 1
      this.changeDirectory(this.current())
    }
  }

  /**
   * Start a new history from the current pointer and change to that directory.
   */
  browse(path: string) {
    if (this.history.length > 0) {
      this.history = this.history.slice(0, this.pointer + 1)
    }
    this.history.push(path)
    this.pointer = this.history.length - 1
    this.changeDirectory(this.current())
  }

  /**
   * Get the pointed at path from the history.
   */
  current() {
    let path = null
    try {
      path = this.history[this.pointer]
    } catch {}

    return path
  }

  /**
   * Move the pointer ahead one and change to that directory if there's future.
   */
  forward() {
    if (this.pointer + 1 < this.history.length) {
      this.pointer += 1
      this.changeDirectory(this.current())
    }
  }

  /**
   * Move to the parent directory if it exists.
   */
  up() {
    this.browse(nodePath.dirname(this.current()))
  }

  /**
   * Broadcast the new directory if it is exists
   */
  private changeDirectory(path: string) {
    if (path) {
      this.path.next(path)
    }
  }

}
