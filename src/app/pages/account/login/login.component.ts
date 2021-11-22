import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/shared/services/users.service';
import { AuthServiceCustom } from 'src/app/services/auth-services/auth.service';
import { LoginRegister } from 'src/app/services/login-register/login-register.service';
import { SharedDataService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private formbulider: FormBuilder,
    private userServices: UserService,
    private loginService: LoginRegister,
    private authService: AuthServiceCustom,
    private SharedDataService: SharedDataService,
     
     ) { }

  loginForm:any
  loginFormSubmitted=false
  ngOnInit() {
    this.loginForm = this.formbulider.group({  
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  get fLoginForm() {
    return this.loginForm.controls; 
  }

  loginresponse:any
  invalidLogin = false;
  onSubmit() {  
    if (this.loginForm.invalid) {
      this.loginFormSubmitted = true;
      return;
    }
     this.loginFormSubmitted = false
    const user = this.loginForm.value;  
    this.loginService.Login(user)
    .subscribe(data => {
        this.loginresponse = data.body;
        if (this.loginresponse.success == true) {
            this.SharedDataService.LoginUser(this.loginresponse.user);
            localStorage.setItem("username", this.loginresponse.user)
            localStorage.setItem("email", this.loginForm.value.email)
            this.invalidLogin = false;
            localStorage.setItem('token', JSON.stringify({ type: "portal", token: this.loginresponse.token }));
            this.router.navigateByUrl('/home/ties');
            this.loginForm.reset()
        } else {
            this.invalidLogin = true;
        }
          }, error => {
        this.invalidLogin = true;
    });
  }

  disableError(){
    this.invalidLogin = false;
  }

}
