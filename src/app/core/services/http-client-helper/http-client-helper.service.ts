import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { ErrorHandlingService } from '../error-handling/error-handling.service';

@Injectable({
  providedIn: 'root'
})
export class HttpClientHelperService {

  private http = inject(HttpClient);
  private errorHandlingService = inject(ErrorHandlingService);
  private apiUrl :string="https://localhost:7173/";  

  get<T>(url: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(this.apiUrl + url, { params })
      .pipe(
        catchError((error: HttpErrorResponse) => this.errorHandlingService.handleError(error))
      );
  }

  post<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(this.apiUrl + url, body)
      .pipe(
        catchError((error: HttpErrorResponse) => this.errorHandlingService.handleError(error))
      );
  }

  put<T>(url: string, body: any): Observable<T> {
    return this.http.put<T>(this.apiUrl + url, body)
      .pipe(
        catchError((error: HttpErrorResponse) => this.errorHandlingService.handleError(error))
      );
  }
  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(this.apiUrl + url)
      .pipe(
        catchError((error: HttpErrorResponse) => this.errorHandlingService.handleError(error))
      );
  }

  patch<T>(url: string, body: any): Observable<T> {
    return this.http.patch<T>(this.apiUrl + url, body)
      .pipe(
        catchError((error: HttpErrorResponse) => this.errorHandlingService.handleError(error))
      );
  }
}
