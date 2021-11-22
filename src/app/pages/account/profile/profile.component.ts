import { Component, OnInit } from '@angular/core';
import { CategoryDataService } from 'src/app/services/shoping-cart/category.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userEmail=''
  userProfile:any
  constructor(
    private CategoryDataService: CategoryDataService,
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem("username")) {
      this.userEmail = localStorage.getItem("email");
    }
    if(this.userEmail!=''){
      this.CategoryDataService.getUserProfile(this.userEmail).subscribe(res => {
        console.log('this userEmail-->',res.body);
        if(res.body){
          this.userProfile=res.body
        }
    })
    }
  }

}
