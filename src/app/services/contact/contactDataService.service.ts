import { Injectable } from "@angular/core";
import { AppUrlsService } from '../shared/app-urls.service';
import { AppHttpClient } from '../auth-services/http-client.service';

@Injectable()
export class ContactDataService {

    private domain = `${this.appUrlsService.domain}`;
    private urls = {
        urlLinkOfContactEmail: `${this.domain}/api/PageSection/ContactEmail`,
        getContactMessage: `${this.domain}/api/Contact/ContactMessage`

    }

    constructor(private http: AppHttpClient, private appUrlsService: AppUrlsService) {

    }

    contactDataSend(data) {
        return this.http.post(this.urls.urlLinkOfContactEmail, data);
    }
    getContactMessage() {
        return this.http.get(`${this.urls.getContactMessage}`);
    }

}