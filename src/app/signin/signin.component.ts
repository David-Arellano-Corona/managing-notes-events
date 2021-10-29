import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { handleError } from '../commons/handleError';
import { SigninService } from './services/signin.service';
import { SessionService } from '../commons/session.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  siginform = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  password_error=""

  constructor(
    private signinService: SigninService,
    private sessionService: SessionService,
    private routeService: Router
  ) { }

  ngOnInit(): void {
  }

  private getValue(key: string) {
    return this.siginform.controls[key].value
  }

  private handleResponse = (res: any) => {
    console.log(res)
    const session = res.access;
    const refresh = res.refresh;
    this.sessionService.setsession(session, refresh)
    this.routeService.navigate(['notes'])
  }

  private errorHandler = (err:any) => {
    console.log(err)
    this.password_error = err.detail
  }

  private clearAlert(){
    this.password_error = ""
  }

  signin() {
    this.clearAlert()
    if (this.siginform.status == "VALID") {
      const password = this.getValue('password');
      const email = this.getValue("email")
      this.signinService.signin(email, password)
        .pipe(catchError(handleError))
        .subscribe(this.handleResponse, this.errorHandler)
    }
    else { }
  }



}
