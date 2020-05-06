import { Injectable } from '@angular/core'

import { Observable, of } from 'rxjs'

import { Message } from 'primeng/api'

import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: Message[] = []

  add(detail: string, summary: string = '', severity: string = 'error') {
    this.messages.push({
      detail,
      severity,
      summary,
    })
    if ( ! environment.production) {
      console.log(severity, summary, detail)
    }
  }

  clear() {
    this.messages = []
  }

  /**
   * Handle a service error. Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  handleError<T>(
    log: (message: string) => void,
    operation = 'operation',
    result?: T,
  ) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error) // log to console instead

      // TODO: better job of transforming error for user consumption
      log(`${operation} failed: ${error.message}`)

      // Let the app keep running by returning an empty result.
      return of(result as T)
    }
  }
}
