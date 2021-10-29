import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SignupService } from './services/signup.service';
import { catchError } from 'rxjs/operators';
import { handleError } from '../commons/handleError';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  self = this

  signup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', Validators.required),
    confirmpassword: new FormControl('', [Validators.required])
  })

  email_error = "";
  nickname_error = "";
  password_error = "";
  confirmpassword_error = "";

  constructor(
    private signupService: SignupService
  ) { }

  ngOnInit(): void { }

  private getValue(key: string) {
    return this.signup.controls[key].value;
  }

  private isSamePassword(password: string, confirmpassword: string) {
    return password == confirmpassword;
  }

  private validateConfirmPassword(password: string, confirmpassword: string) {
    const isSamePassword = this.isSamePassword(password, confirmpassword)

    if (!isSamePassword) {
      this.confirmpassword_error = "El campo contraseña y confirmar contraseña deben ser iguales"
      return false;
    }
    return true;
  }

  private clearAlerts() {
    if (this.getValue('email')) this.email_error = "";
    if (this.getValue('username')) this.nickname_error = "";
    if (this.getValue('password')) this.password_error = "";
    if (this.getValue('confirmpassword')) this.confirmpassword_error = "";
  }

  private printAlerts() {
    this.email_error = "Email es un campo obligatorio";
    this.nickname_error = "Nombre de usuario es un campo obligatorio";
    this.password_error = "Contraseña es un campo obligatorio";
    this.confirmpassword_error = "Confirmar contraseña es un campo obligatorio"
  }

  private handleHttpErrors = (err: any) => {
    console.log(err)
    for (let key in err) {
      //@ts-ignore
      this[`${key}_error`] = err[key][0]
    }
  }

  private resetForm(){
    this.signup.reset()
    this.email_error = "";
    this.nickname_error = "";
    this.password_error = "";
    this.confirmpassword_error = "";
  }

  private handleHttpResponse = (response: any) => {
    this.resetForm()
  }

  save() {
    this.clearAlerts()
    if (this.signup.valid) {
      const pass = this.getValue('password')
      const confirm = this.getValue('confirmpassword')
      if (!this.validateConfirmPassword(pass, confirm)) return

      this.signupService.signup({
        email: this.getValue('email'),
        nickname: this.getValue('username'),
        password: pass
      })
        .pipe(catchError(handleError))
        .subscribe(
          this.handleHttpResponse,
          this.handleHttpErrors
        )
    } else {
      this.printAlerts()
    }
  }


}
