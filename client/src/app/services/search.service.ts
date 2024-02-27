import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor( private http: HttpClient) {}
    
    getSqlStatement(data: any) {
      
      
      console.log("data in service:", {messages: data})
      return this.http.post(environment.apiServiceUrl + 'search', {messages: data},{responseType: 'text'}).pipe( 
        map(
              (response: any) => {
                return response
                
              }
    ))
    .pipe(
      catchError((err:HttpErrorResponse) => {
        console.log("i got error in service", err)
        return throwError(() => new Error(err.message));

          
      })
    )}
   
}
