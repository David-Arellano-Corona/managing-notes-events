import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { Observable, Subscriber } from 'rxjs';
import { SessionService } from './session.service';
import { handleError } from '../commons/handleError';
import { DOMAIN } from '../config';


interface Refresh {
    access: string
}

@Injectable()
export class RefreshService {
    private jwt = new JwtHelperService();
    private URL_REFRESH = `${DOMAIN}/api/token/refresh/`

    constructor(
        private sessionService: SessionService,
        private httpService: HttpClient
    ) {
    }

    private handleError(err: any, subscriber:Subscriber<unknown>) {
        console.log(err)
        subscriber.complete();
        //toDo: deberá aparecer un modal que indique que algo salio mal y al dar click
        //en aceptar redireccionará al login
    }
    private handleResponse(res: Refresh, subscriber:Subscriber<unknown>) {
        const refresh_token = this.sessionService.getrefresh()
        const access_token = res.access
        this.sessionService.setsession(access_token, refresh_token as string)
        subscriber.complete();
    }

    private refresToken(subscriber:Subscriber<unknown>) {
        const refresh_token = this.sessionService.getrefresh();
        this.httpService.post<Refresh>(this.URL_REFRESH, { refresh: refresh_token }, {
            responseType: 'json'
        }).pipe(
            retry(3),
            catchError(handleError)
        ).subscribe(
            (e) => this.handleResponse(e, subscriber),
            (error) => this.handleError(error, subscriber)
        )


    }

    checkTokenExpiration() {
        return new Observable(subscriber => {
            const token = this.sessionService.getsession();
            const isExPired = this.jwt.isTokenExpired(token as string)
            console.log({ isExPired })
            if (isExPired) {
                return this.refresToken(subscriber)
            }else{
                subscriber.complete();
            }
        })
    }
}