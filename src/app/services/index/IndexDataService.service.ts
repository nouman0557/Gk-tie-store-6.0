import { Injectable } from "@angular/core";
import { AppHttpClient } from '../auth-services/http-client.service';
import { AppUrlsService } from '../shared/app-urls.service';

@Injectable()
export class IndexDataServcies {

    private domain = `${this.appUrlsService.domain}`;
    private urls = {
        getAllSlider: `${this.domain}/api/Slider/AllSlider`,
        getIndexPageSection: `${this.domain}/api/PageSection/GetMailSection`,
        getCollectionSection: `${this.domain}/api/PageSection/GetCollectSection`,
        getNewArrivalSection: `${this.domain}/api/PageSection/GetNewArrivalSection`,
        footerSection: `${this.domain}/api/PageSection/GetFooterSection`,
        mailSubscriber: `${this.domain}/api/PageSection/MailSubscriber?mail=`,
        getsocialMedaiLInks: `${this.domain}/api/SocialMedaiLinks/GetSocialLnks`,
        serviceSectionUrl: `${this.domain}/api/PageSection/GetServiceSection`,
    }

    constructor(private http: AppHttpClient, private appUrlsService: AppUrlsService) {
    }

    mailSubscriber(email) {
        return this.http.get(this.urls.mailSubscriber + email);
    }

    getSliderList() {
        return this.http.get(`${this.urls.getAllSlider}`);
    }

    getIndexSection() {
        return this.http.get(`${this.urls.getIndexPageSection}`);
    }
    getCollectionSection() {
        return this.http.get(`${this.urls.getCollectionSection}`);
    }
    getNewArraivlSection() {
        return this.http.get(`${this.urls.getNewArrivalSection}`);
    }
    getFooterSection() {
        return this.http.get(`${this.urls.footerSection}`);
    }
    getSocialMediaLinks() {
        return this.http.get(`${this.urls.getsocialMedaiLInks}`);
    }
    getServiceSection() {
        return this.http.get(`${this.urls.serviceSectionUrl}`);
    }
}