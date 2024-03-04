import { NgModule } from '@angular/core';
import { JwtModule } from "@auth0/angular-jwt";
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewTenantComponent } from './new-tenant/new-tenant.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './services/auth.service';
import { ResultListComponent } from './result-list/result-list.component';
import { ResultItemComponent } from './result-item/result-item.component';
import { FormsModule } from '@angular/forms';
import { NewListingComponent } from './new-listing/new-listing.component';
import { GoogleLoggedInComponent } from './google-logged-in/google-logged-in.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { SpinnerInterceptorService } from './services/spinner-interceptor.service';
@NgModule({
  declarations: [
    AppComponent,
    NewTenantComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    ResultListComponent,
    ResultItemComponent,
    NewListingComponent,
    GoogleLoggedInComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: function  tokenGetter() {
          return localStorage.getItem('token');
        }
      }
    }),

  ],
  providers: [ HttpClientModule,AuthService,{
    provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptorService, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
