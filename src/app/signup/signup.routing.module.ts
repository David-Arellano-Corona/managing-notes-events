import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './signup.component';
import { SignupService } from './services/signup.service';

let routes:Routes = [
  { path:'', component:SignupComponent }
];


@NgModule({
  imports: [
    RouterModule.forChild(routes),
    HttpClientModule
  ],
  providers:[
    SignupService
  ]
})
export class SignupRoutingModule { }
