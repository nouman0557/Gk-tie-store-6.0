import { Injectable, Output, EventEmitter } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { AppHttpClient } from '../auth-services/http-client.service';
import { AppUrlsService } from '../shared/app-urls.service';
@Injectable()
export class CartDataService {
    constructor(private http: AppHttpClient, private appUrlsService: AppUrlsService) {

    }
    private domain = `${this.appUrlsService.domain}`;
    private urls = {
        getCurrentColorThemeUrl: `${this.domain}/api/PageSection/GetThemeColor`,

    }
    @Output() totalQuantity = new EventEmitter();
    quantityUpdate(val) {
        console.log(val);
        this.totalQuantity.emit(val);
    }
    private message = new BehaviorSubject('0');
    sharedMessage = this.message.asObservable();
    nextMessage(message: string) {
        this.message.next(message)
    }
    getCurrentThemeColor() {
        return this.http.get(`${this.urls.getCurrentColorThemeUrl}`);
    }
}