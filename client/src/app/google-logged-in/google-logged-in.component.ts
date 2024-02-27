import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-google-logged-in',
  templateUrl: './google-logged-in.component.html',
  styleUrl: './google-logged-in.component.css'
})
export class GoogleLoggedInComponent implements OnInit {

  constructor( private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      if (params['token']) {
        localStorage.setItem('token', params['token']);
      }
    })
  }
}
