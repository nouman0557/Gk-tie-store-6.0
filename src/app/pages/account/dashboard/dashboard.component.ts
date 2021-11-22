import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    public openDashboard: boolean = false;

    constructor(private router: Router) {
    }

    ngOnInit(): void {
    }

    ToggleDashboard() {
        this.openDashboard = !this.openDashboard;
    }

    LogOut() {
        localStorage.removeItem('username')
        sessionStorage.removeItem('token');
        this.router.navigateByUrl('/pages/login');
    }

}
