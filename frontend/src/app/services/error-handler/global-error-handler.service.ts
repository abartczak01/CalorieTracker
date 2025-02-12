import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {

  public handleError(error: Error): void {
    console.log('An error occurred from handler:', error);
  }
}
