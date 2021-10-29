import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn:"root"
})
export class SessionService{
    setsession(token:string, refresh:string){
        localStorage.setItem('session', token);
        localStorage.setItem('refresh', refresh)
    }

    getsession(){
        return localStorage.getItem('session')
    }

    getrefresh(){
        return localStorage.getItem('refresh')
    }
    getsessionInfo(){
        const token = this.getsession() as string;
        const jwt = new JwtHelperService();
        const payload = jwt.decodeToken(token);
        return payload
    }
}