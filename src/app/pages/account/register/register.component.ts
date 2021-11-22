import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/shared/classes/must-match';
import { LoginRegister } from 'src/app/services/login-register/login-register.service';
import { ToastrService } from 'ngx-toastr';
import { Router }  from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private formbulider: FormBuilder,
    private registerService: LoginRegister,
    private toastrService: ToastrService,
    private router: Router,
     ) { }  

  ngOnInit() {

    this.registerForm = this.formbulider.group({
      Fname: ['', [Validators.required]],  
      Lname: ['', [Validators.required]],  
      Email: ['', [Validators.required, Validators.email]],  
      Phone: ['', [Validators.required]],  
      Password: ['', [Validators.required]],  
      Images : [''],  
      confirmPassword: ['', Validators.required]
    }, { validator: MustMatch('Password', 'confirmPassword')
    }); 
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
   }

   saveResponse:any
   registerForm:any
   registerFormValidError=false
   userAlreadyExist=false
   registerUser() {
    if (this.registerForm.invalid) {
      this.registerFormValidError = true;
      return
    }
    this.registerFormValidError = false;
       let responofcheck;
       this.registerService.CheckEmail({ email: this.registerForm.value.Email }).subscribe(res => {
           responofcheck = res.body;
           if (responofcheck.success == true) {
           let registerData=JSON.parse(JSON.stringify(this.registerForm.value))
           delete registerData['confirmPassword']
                   this.registerService.Create(registerData).subscribe(res => {
                       this.saveResponse = res.body;
                       if (this.saveResponse.status == true) {
                        this.toastrService.success('User Register Successfully.');
                           this.registerForm.reset()
                           this.userAlreadyExist=false
                           this.router.navigateByUrl('/pages/login');
                       }
                   })
           } else {
             this.userAlreadyExist=true
           }
       })

   }

   get fRegisterForm() {
    return this.registerForm.controls; 
   
   }

   changeEmailErrorValue(){
    this.userAlreadyExist=false
   }
}
