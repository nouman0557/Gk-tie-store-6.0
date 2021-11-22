
import { Injectable, Output, EventEmitter } from "@angular/core";
import { AppHttpClient } from '../auth-services/http-client.service';
import { AppUrlsService } from './app-urls.service';
@Injectable()
export class SharedDataService {
    constructor(private http: AppHttpClient, private appUrlsService: AppUrlsService) { }

    private domain = `${this.appUrlsService.domain}`;
    private urls = {
        getsocialMedaiLInks: `${this.domain}/api/SocialMedaiLinks/GetSocialLnks`,
        menuurl: `${this.domain}/api/Menu/GetAllMenu`,
    }


    @Output() value = new EventEmitter();
    LoginUser(val) {
        this.value.emit(val);
    }
    getSocialMediaLinks() {
        return this.http.get(`${this.urls.getsocialMedaiLInks}`);
    }
    getAllMenu() {
        return this.http.get(`${this.urls.menuurl}`);
    }

}