import { Injectable } from "@angular/core";
import { AppHttpClient } from '../auth-services/http-client.service';
import { AppUrlsService } from '../shared/app-urls.service';

@Injectable()
export class LoginRegister {

    private domain = `${this.appUrlsService.domain}`;
    private urls = {
        loginApi: `${this.domain}/api/Authorization/Login`,
        logincheckemailApi: `${this.domain}/api/Authorization/CheckEmail`,
        createapi: `${this.domain}/api/Authorization/RegisterCustomer`,
        getallCategory: `${this.domain}/api/CategoryProuduct/AllCategory`,
        sendPasswordRecoveryEmail: `${this.domain}/api/Authorization/SendPasswordRecoveryEmail?email`,
        updateUserPassword: `${this.domain}/api/Authorization/UpdateUserPassword`,
    }

    constructor(private http: AppHttpClient, private appUrlsService: AppUrlsService) {
    }

    Login(data) {
        return this.http.postWithOut(this.urls.loginApi, data);
    }

    CheckEmail(data) {
        return this.http.postWithOut(this.urls.logincheckemailApi, data);
    }

    Create(data) {
        return this.http.postWithOut(this.urls.createapi, data);
    }

    getAll() {
        return this.http.getwityout(this.urls.getallCategory);
    }

    sendPasswordRecoveryEmail(email){
        return this.http.postWithOut(`${this.urls.sendPasswordRecoveryEmail}=${email}`,'');
    }
    
    updateUserPassword(data) {
        return this.http.postWithOut(this.urls.updateUserPassword, data);
    }
}