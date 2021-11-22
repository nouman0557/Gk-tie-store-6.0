import { Component, OnInit } from '@angular/core';
import { LoginRegister } from 'src/app/services/login-register/login-register.service';
import { SharedDataService } from 'src/app/services/shared/shared.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MustMatch } from 'src/app/shared/classes/must-match';
import { analyzeFileForInjectables } from '@angular/compiler';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(
    private loginService: LoginRegister,
    private router: Router,
    private formbulider: FormBuilder,
    private SharedDataService: SharedDataService,
    private toastrService: ToastrService
  ) { }

  newPassword=false
  password=''
  reEnterPassword=''
  email=''
  newPasswordForm:any
  emailForm:any
  newPasswordFormValiderror=false
  pinDive=false
  ngOnInit(): void {
    this.newPasswordForm = this.formbulider.group({ 
      email: ['', [Validators.required]],  
      password: ['', [Validators.required]],  
      confirmPassword: ['', Validators.required]
    }, { validator: MustMatch('password', 'confirmPassword')
    }); 
    this.emailForm = this.formbulider.group({  
      email: ['', [Validators.required, Validators.email]]
    });
  }
  get fnewPasswordForm() {
    return this.newPasswordForm.controls; 
   
   }

   get fEmailForm() {
    return this.emailForm.controls; 
  }

  invalidemail=false
  emailCheckResult:any
  emailFormSubmitted=false
  apiCall=false
  emailDiv=true
  sendPasswordRecoveryEmail(){
    if (this.emailForm.invalid) {
      this.emailFormSubmitted = true;
      return;
    }
     this.emailFormSubmitted = false
     this.apiCall=true
    this.loginService.sendPasswordRecoveryEmail(this.emailForm.value.email)
    .subscribe(data => {
      this.apiCall=false
        this.emailCheckResult = data.body;
        if(this.emailCheckResult==-1){
          this.invalidemail=true
        }else{
          this.emailDiv=false
          this.pinDive=true
          this.newPasswordForm.controls['email'].setValue(this.emailForm.value.email)
          this.emailForm.reset()
        }
          }, error => {
            this.apiCall=false
            this.toastrService.error('Something went wrong. Please try later.');
    });
  }

  userPin=''
  userPinError=false
  checkPin(){
    if(this.userPin==this.emailCheckResult){
      this.newPassword=true
      this.pinDive=false
    }else{
      this.userPinError=true
    }

  }

  updateUserPassword(){
    if (this.newPasswordForm.invalid) {
      this.newPasswordFormValiderror = true;
      return
    }
    this.apiCall=true
    this.newPasswordFormValiderror = false;
    let newpasswordData=JSON.parse(JSON.stringify(this.newPasswordForm.value))
    delete newpasswordData['confirmPassword']
    this.loginService.updateUserPassword(newpasswordData)
    .subscribe(data => {
      this.apiCall=false
        if(data.body){
          this.toastrService.success('Password changed Successfully.');
          this.router.navigateByUrl('/pages/login')
      }else{
        this.toastrService.error('Something went wrong. Please try later.');
      }
        this.newPasswordForm.reset()
          }, error => {
            this.apiCall=false
            this.toastrService.error('Something went wrong. Please try later.');
    });
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

}
