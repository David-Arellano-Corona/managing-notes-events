import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignupDto } from '../schemas/signup.schema';


@Injectable()
export class SignupService{

    private urlDomain = 'http://localhost:8000/users/signup'

    constructor(
        private http:HttpClient
    ){}

    

    signup(signupDto:SignupDto):Observable<SignupDto>{
        return this.http.post<SignupDto>(this.urlDomain,signupDto,{ 
            responseType:'json'
        })
    }
}