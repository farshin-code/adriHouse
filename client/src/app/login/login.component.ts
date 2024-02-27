import { Component } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private service: AuthService, private router: Router) { }
  loginError:Boolean = false

  loginForm = new FormGroup({
    username: new FormControl( '',Validators.required), 
    password: new FormControl( '',Validators.required),
  })


  showPassword = false;

  onSubmit() {
    this.service.login(this.loginForm.value).subscribe(
      
      {
        next:data =>{
          this.router.navigate(['/'])
          console.log(data)
        },
        error:err =>{
          console.log("Error:", err)
          this.loginError = true
        }
      }
      )
  }

  onClickEye() {
        this.showPassword = !this.showPassword;
  }
}
