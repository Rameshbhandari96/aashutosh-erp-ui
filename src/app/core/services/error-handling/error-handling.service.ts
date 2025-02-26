import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {
  handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred.';

    if (error.error instanceof ErrorEvent) {
      console.error('Client-side error:', error.error.message);
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      switch (error.status) {
        case 0:
          errorMessage = 'Network error: Please check your internet connection.';
          break;
        case 400:
          errorMessage = error.error?.message || 'Bad request. Please check your input.';
          break;
        case 401:
          errorMessage = error.error?.message || 'Unauthorized: Incorrect username or password.';
          break;
        case 403:
          errorMessage =  error.error?.message ||'Forbidden: You do not have permission to access this resource.';
          break;
        case 404:
          errorMessage =  error.error?.message ||'Not Found: The requested resource could not be found.';
          break;
        case 405:
          errorMessage =  error.error?.message ||'Method Not Allowed: The request method is not supported for this resource.';
          break;
        case 409:
          errorMessage =  error.error?.message ||'Conflict: There is a conflict with the current state of the resource.';
          break;
        case 413:
          errorMessage = error.error?.message || 'Payload Too Large: The request is too large to process.';
          break;
        case 415:
          errorMessage = error.error?.message || 'Unsupported Media Type: The request format is not supported.';
          break;
        case 422:
          errorMessage =  error.error?.message ||'Unprocessable Entity: The request contains semantic errors.';
          break;
        case 429:
          errorMessage =  error.error?.message ||'Too Many Requests: You have made too many requests in a short time.';
          break;
        case 500:
          errorMessage =  error.error?.message ||'Internal server error: Please try again later.';
          break;
        case 503:
          errorMessage = error.error?.message || 'Service Unavailable: The server is currently unavailable. Please try again later.';
          break;
        case 504:
          errorMessage =  error.error?.message ||'Gateway Timeout: The server took too long to respond.';
          break;
        default:
          errorMessage =  error.error?.message ||'Something went wrong. Please try again.';
          break;
      }
      console.error(`Backend error (Status: ${error.status}):`, error.error);
    }
    return throwError(() => new Error(errorMessage));
  }
}
