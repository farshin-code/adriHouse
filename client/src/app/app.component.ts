import { Component, OnInit } from '@angular/core';
import { SpinnerService } from './services/spinner.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Adri House';
  showSpinner = false;

  constructor(private spinnerService: SpinnerService) {}

  ngOnInit() {
    this.spinnerService.getSpinner().subscribe((value) => {
      console.log("from app component onInit:",value);
      if (value) {
          this.showSpinner = true;
      } else {
          this.showSpinner = false;
      }
    });
  }
}
