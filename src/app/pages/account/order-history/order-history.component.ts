import { Component, OnInit } from '@angular/core';
import { CategoryDataService } from 'src/app/services/shoping-cart/category.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
  userEmail=''
  orderHistory:any
  constructor(
    private CategoryDataService: CategoryDataService,
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem("username")) {
      this.userEmail = localStorage.getItem("email");
    }
    if(this.userEmail!=''){
      this.CategoryDataService.getUserOrderHistory(this.userEmail).subscribe(res => {
        console.log('this orderHistory-->',res.body);
        if(res.body){
          this.orderHistory=res.body
        }
    })
    }
  }

}
