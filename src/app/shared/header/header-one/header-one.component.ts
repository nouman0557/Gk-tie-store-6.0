import {Component, OnInit, Input, HostListener} from '@angular/core';
import {SharedDataService} from 'src/app/services/shared/shared.service';
import {Router} from '@angular/router';
import {CartDataService} from 'src/app/services/shoping-cart/cart.service';

@Component({
    selector: 'app-header-one',
    templateUrl: './header-one.component.html',
    styleUrls: ['./header-one.component.scss']
})
export class HeaderOneComponent implements OnInit {

    @Input() class: string;
    @Input() themeLogo: string = 'assets/logo/Logo.png'; // Default Logo
    @Input() topbar: boolean = true; // Default True
    @Input() sticky: boolean = false; // Default false

    public stick: boolean = false;


    constructor(
        private SharedDataService: SharedDataService,
        private router: Router,
        private CartDataService: CartDataService,
    ) {
    }

    username = ''
    login=false
    ngOnInit(): void {
        if (localStorage.getItem("username")) {
            this.username = localStorage.getItem("username");
            this.login=true
        }
    }

    // @HostListener Decorator
    @HostListener("window:scroll", [])
    onWindowScroll() {
        let number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        if (number >= 300 && window.innerWidth > 400) {
            this.stick = true;
        } else {
            this.stick = false;
        }
    }

    logout() {
        // this.authServicefb.signOut();
        this.username = ''
        this.login=false
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        this.SharedDataService.LoginUser("Login / Register");
        this.router.navigate(["/home/ties"])
    }

}
