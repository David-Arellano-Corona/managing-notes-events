import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOMAIN } from '../../config';

@Injectable()
export class SigninService {
    constructor(
        private httpService: HttpClient
    ) { }

    signin(email: string, password: string) {
        return this.httpService.post(`${DOMAIN}/api/login/`, {
            email,
            password
        }, {
            responseType: 'json'
        }
        )
    }
}