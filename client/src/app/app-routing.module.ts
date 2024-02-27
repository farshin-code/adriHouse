import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NewTenantComponent } from './new-tenant/new-tenant.component';
import { HomeComponent } from './home/home.component';
import { NewListingComponent } from './new-listing/new-listing.component';
import { AuthGuard } from './common/auth.guard';
import { GoogleLoggedInComponent } from './google-logged-in/google-logged-in.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'new-tenant', component: NewTenantComponent },
  { path: 'new-listing', component:  NewListingComponent, canActivate: [AuthGuard] },
  { path: 'google-logged-in', component: GoogleLoggedInComponent },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
