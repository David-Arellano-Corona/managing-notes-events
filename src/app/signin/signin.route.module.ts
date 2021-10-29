import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './signin.component';
import { SigninService } from './services/signin.service';

let route:Routes = [
  { path:'', component:SigninComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(route)
  ],
  providers:[
    SigninService
  ]
})
export class SigninRouteModule { }
