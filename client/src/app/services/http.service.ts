import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { newTenant } from '../common/interfaces';
import { environment } from '../../environments/environment.development';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  postNewTenant(data: newTenant) {
    return this.http.post(environment.apiServiceUrl + 'createTenant', data).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(() => new Error(err.message));
      })
    );
    
  }
}
