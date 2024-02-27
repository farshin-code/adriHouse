import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class NewListingService {

  token = localStorage.getItem('token')
  constructor( private http: HttpClient) { }

  postNewListingImage(formdata: FormData) {
    console.log("token:", this.token)
    return this.http.post(environment.uploadServer, formdata, {
      responseType: 'text',
      headers: {'Authorization': `Bearer ${this.token}`},
    })
      .pipe(
            map(
        (response: any) => {
          return response
        }
      )
    ).pipe(
      catchError((err:HttpErrorResponse) => {
        console.log("i got error in service", err)
        return throwError(() => new Error(err.message));
      })
    );
  }
  postNewListing(formData: any) {
    
    return this.http.post(environment.apiServiceUrl + 'addProperty', formData , {
      responseType: 'text',
      headers: {'Authorization': `Bearer ${this.token}`},
      withCredentials: true
    }).pipe(
      
      map(
        (response: any) => {
          console.log("response from api", response)
          return response
        }
      )
    ).pipe(
      catchError((err:HttpErrorResponse) => {
        console.log("i got error in service", err)
        return throwError(() => new Error(err.message));
      })
    );
    
  }

  deleteFileFromServer(fileName: string) {
    console.log("token:", this.token)
    return this.http.delete(environment.deleteFileService + fileName, {
      responseType: 'text',
      headers: {'Authorization': `Bearer ${this.token}`},
    })
      .pipe(
            map(
        (response: any) => {
          return response
        }
      )
    ).pipe(
      catchError((err:HttpErrorResponse) => {
        console.log("i got error in service", err)
        return throwError(() => new Error(err.message));
      })
    );
  }

}
