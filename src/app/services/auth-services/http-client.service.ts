import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class AppHttpClient {

    constructor(private _http: HttpClient) {

    }

    createHeaders() {
        let token = localStorage.getItem('token');

        if (token != null && token != undefined) {
            let headers = new HttpHeaders();
            headers.set('Authorization', `${token}`);
            headers.set('Access-Control-Allow-Origin', '*');

            return headers;
        }

        return new HttpHeaders();
    }

    get(url) {
        return this._http.get(url, {
            headers: this.createHeaders(),
            observe: 'response'
        });
    }
    getwityout(url) {
        return this._http.get(url, {

            observe: 'response'
        });
    }

    post(url, data) {
        return this._http.post(url, data, {

            headers: this.createHeaders(),
            observe: 'response'
        });
    }
    postWithOut(url, data) {
        return this._http.post(url, data, {
            observe: 'response'
        });
    }

    put(url, data) {
        return this._http.put(url, data, {

            headers: this.createHeaders(),
            observe: 'response'
        });
    }
    delete(url) {
        return this._http.delete(url, {
            headers: this.createHeaders(),
            observe: 'response'
        });
    }
}