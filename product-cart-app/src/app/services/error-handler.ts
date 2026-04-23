import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  handleError(error: HttpErrorResponse) {
    console.log('errorhandler triggered')
    let userMessage = '';

    // 🔹 Client-side or network error
    if (error.status ===0) {
      userMessage = 'Network error: Unable to reach server.';
    }

    // 🔹 Backend returned error status
    else {
      switch (error.status) {

        case 400:
          userMessage = 'Bad request. Please check the data you submitted.';
          break;

        case 401:
          userMessage = 'Unauthorized access. Please log in.';
          break;

        case 403:
          userMessage = 'Forbidden. You do not have permission.';
          break;

        case 404:
          userMessage = 'Requested resource not found.';
          break;

        case 500:
          userMessage = 'Server error. Please try again later.';
          break;

        default:
          userMessage = 'An unexpected error occurred.';
      }
    }

    console.error('HTTP Error:', error);

    return throwError(() => userMessage);
  }
}
