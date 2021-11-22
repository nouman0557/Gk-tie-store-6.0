import {Component, OnInit, Input} from '@angular/core';
import {IndexDataServcies} from 'src/app/services/index/IndexDataService.service';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-footer-one',
    templateUrl: './footer-one.component.html',
    styleUrls: ['./footer-one.component.scss']
})
export class FooterOneComponent implements OnInit {

    @Input() class: string = 'footer-light' // Default class
    @Input() themeLogo: string ='assets/logo/Logo.png'// Default Logo
    @Input() newsletter: boolean = true; // Default True

    public today: number = Date.now();

    constructor(
        private IndexDataServcies: IndexDataServcies,
        private toastrService: ToastrService
    ) {
    }

    footer;
    mediaLinks;

    ngOnInit(): void {
        this.IndexDataServcies.getFooterSection().subscribe(res => {
            console.log(res);
            this.footer = res.body;
        })
        this.IndexDataServcies.getSocialMediaLinks().subscribe(res => {
            console.log(res);
            this.mediaLinks = res.body;
        })
    }

    subEmail = ''

    mailSubscriber() {
        if (this.subEmail == "" || this.subEmail == undefined) {
            this.hideMailError = true

        } else {
            this.IndexDataServcies.mailSubscriber(this.subEmail).subscribe(res => {
                console.log(res);
                this.hideMailError = false
                this.subEmail = ''
                this.toastrService.success('Thank You for Subscribing to Our Email Service.');
            })
        }
    }

    hideMailError = false

    hideMailErrorFun() {
        this.hideMailError = false
    }
}
