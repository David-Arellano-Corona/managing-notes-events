import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SigninRouteModule } from './signin.route.module';
import { SigninComponent } from './signin.component';



@NgModule({
  declarations: [
    SigninComponent
  ],
  imports: [
    CommonModule,
    SigninRouteModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class SigninModule { }
