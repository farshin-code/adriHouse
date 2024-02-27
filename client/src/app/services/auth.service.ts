import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpClient, private jwtHelper: JwtHelperService) { }

  login(credentials: any) {
    console.log(JSON.stringify(credentials));
    return this.http.post(environment.loginServiceUrl, credentials,{withCredentials: true})
    .pipe( 
        map(

              (response: any) => {
                console.log("response is here", response);
                if (response.token) {
                  console.log("response token: " + response.token);
                  localStorage.setItem('token', response.token);
                  return true
                }else
                {
                  console.log("response", response);
                  return false
                }
                
              }
    ))
    .pipe(
      catchError((err:HttpErrorResponse) => {

        return throwError(() => new Error(err.message));

          
      })
    )
    
  }
  isLoggedIn() {
    if (!localStorage.getItem('token')) {
      return false
    }
     const token = localStorage.getItem('token');
     const result = this.jwtHelper.isTokenExpired(token);
    
     return !result
  }

  isAdmin() {
    if (!localStorage.getItem('token')) {
      return false
    }
    const token:any  = localStorage.getItem('token');
    const result = this.jwtHelper.decodeToken(token);
    return result.userRole === "admin"
  }
  currentUser() {
    if (!localStorage.getItem('token')) {
      console.log("no token")
      return false
    }
    const token:any  = localStorage.getItem('token');
    const result = this.jwtHelper.decodeToken(token);
    console.log("token from auth service",result)
    return result.username
  }
  logout() {
    localStorage.removeItem('token');
  }
}
