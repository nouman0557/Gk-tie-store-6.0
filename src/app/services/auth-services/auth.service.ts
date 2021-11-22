import { Injectable } from "@angular/core";
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthServiceCustom {

    helper: JwtHelperService;

    constructor() {
        this.helper = new JwtHelperService();
    }

    get isAuthenticated() {
        if (localStorage.getItem("token") != null) {
            var getToken = JSON.parse(localStorage.getItem('token'));
            if (getToken.type == "portal") {
                return !this.helper.isTokenExpired(getToken.token);
            } else if (getToken.type == "fb") {
                return true;
            }
        } else {
            return false;
        }
    }
}