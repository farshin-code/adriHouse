import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { newTenant } from '../common/interfaces'
import { GloginService } from '../services/glogin.service';
@Component({
  selector: 'app-new-tenant',
  templateUrl: './new-tenant.component.html',
  styleUrl: './new-tenant.component.css'
})
export class NewTenantComponent {
  
  constructor (private http: HttpService, private gloginService: GloginService) { }
  error: string=''
  showPassword: boolean = false;

  
  imgPreview:string = 'https://picsum.photos/200/300';
  form = new FormGroup({
    companyName: new FormControl('', [
      Validators.required,
       Validators.minLength(3),
       Validators.maxLength(30)]),
    adminFullName: new FormControl('', [
      Validators.required,
       Validators.minLength(3),
       Validators.maxLength(30)]),
    username: new FormControl('', [
      Validators.email,Validators.required]),
    password: new FormControl('', [
      Validators.required,
       Validators.minLength(3),
       Validators.maxLength(50),
       Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      ]),

  })
  get adminFullName() {
    return this.form.get('adminFullName');
  }
  get username() {
    return this.form.get('username');
  }
  get password() {
    return this.form.get('password');
  }
  

  onClickEye() {
    
    this.showPassword = !this.showPassword;
  }

  onSubmit(){
    this.error = ''
    const data: newTenant = {
      companyName: this.form.value.companyName || '',
      adminFullName: this.form.value.adminFullName || '',
      username: this.form.value.username || '',
      password: this.form.value.password || '',
    }
    this.http.postNewTenant(data).subscribe( res => {
      console.log(res)
      this.form.reset()
    },
    err => {
      this.error = err.error.message
    
    }) 
  }

  googleLogin( event : any) {
    console.log('glogin')
    event.preventDefault();
    this.gloginService.loginWithGoogle().subscribe( 
      (data: any) => {
        
      },
      (error) => {
        console.error('Error:', error);
      }

    )
  }
  
}
