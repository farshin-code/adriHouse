import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private spinner$= new BehaviorSubject<boolean>(false);
  constructor() { }

  getSpinner():Observable<boolean>{
    return this.spinner$.asObservable();
  }

  show(){
    console.log("showing spinner")
    this.spinner$.next(true);
  }
  hide(){
    console.log("hiding spinner")
      this.spinner$.next(false);
    }
  
}
