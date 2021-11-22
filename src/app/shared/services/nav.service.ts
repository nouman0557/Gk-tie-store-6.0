import {Injectable, HostListener} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

// Menu
export interface Menu {
    path?: string;
    title?: string;
    type?: string;
    megaMenu?: boolean;
    image?: string;
    active?: boolean;
    badge?: boolean;
    badgeText?: string;
    children?: Menu[];
}

@Injectable({
    providedIn: 'root'
})

export class NavService {

    constructor() {
    }

    public screenWidth: any;
    public leftMenuToggle: boolean = false;
    public mainMenuToggle: boolean = false;

    // Windows width
    @HostListener('window:resize', ['$event'])
    onResize(event?) {
        this.screenWidth = window.innerWidth;
    }

    MENUITEMS: Menu[] = [
        {path: '/home/ties', title: 'home', type: 'link', active: true},
        {path: '/shop/collection/left/sidebar', title: 'TIES', type: 'link', active: false},
        {
            title: 'order', type: 'sub', active: false, children: [
                {path: '/shop/cart', title: 'my order', type: 'link'},
                {path: '/shop/wishlist', title: 'wishlist', type: 'link'},
                {path: '/shop/checkout', title: 'checkout', type: 'link', active: false},

            ]
        },
        {
            title: 'about', type: 'sub', active: false, children: [
                {path: '/pages/aboutus', title: 'About Us', type: 'link'},
                {path: '/pages/contact', title: 'Contact Us', type: 'link'},
                {path: '/pages/termsConditions', title: 'Terms and Conditions', type: 'link'},
                {path: '/pages/privacyPolicy', title: 'Privacy Policy', type: 'link'},
                {path: '/pages/deliveryInfo', title: 'Delivery Information', type: 'link'},
                {path: '/pages/Returns', title: 'Returns Policy', type: 'link'},
            ]
        },

    ];
    LEFTMENUITEMS: Menu[] = [
        {path: '/home/ties', title: 'home', type: 'link', active: true},
        {path: '/shop/collection/left/sidebar', title: 'TIES', type: 'link', active: false},
        {
            title: 'order', type: 'sub', active: false, children: [
                {path: '/shop/cart', title: 'my order', type: 'link'},
                {path: '/shop/wishlist', title: 'wishlist', type: 'link'},
                {path: '/shop/checkout', title: 'checkout', type: 'link', active: false},

            ]
        },
        {
            title: 'about', type: 'sub', active: false, children: [
                {path: '/pages/aboutus', title: 'About Us', type: 'link'},
                {path: '/pages/contact', title: 'Contact Us', type: 'link'},
                {path: '/pages/faq', title: 'FAQs', type: 'link'},
            ]
        },
        {
            title: 'account', type: 'sub', active: false, children: [
                {path: '/pages/login', title: 'login', type: 'link'},
                {path: '/pages/register', title: 'register', type: 'link'},
                {path: '/pages/contact', title: 'address book', type: 'link'},
            ]
        },

    ];

    // Array
    items = new BehaviorSubject<Menu[]>(this.MENUITEMS);
    leftMenuItems = new BehaviorSubject<Menu[]>(this.LEFTMENUITEMS);

}
