import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthServiceCustom } from "./auth.service";
import { AppUrlsService } from "../shared/app-urls.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthServiceCustom, private appUrlsService: AppUrlsService, private router: Router) { }

    canActivate() {
        if (this.authService.isAuthenticated) {
            return true;
        }
        this.router.navigate(["/sso/login"])
        return false;
    }
}