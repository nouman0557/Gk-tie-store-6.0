import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { environment } from '../../../environments/environment';
import { Product } from "../../shared/classes/product";
import { ProductService } from "../../shared/services/product.service";
import { OrderService } from "../../shared/services/order.service";
import { CategoryDataService } from 'src/app/services/shoping-cart/category.service';
import { CartDataService } from 'src/app/services/shoping-cart/cart.service';
import { AppUrlsService } from 'src/app/services/shared/app-urls.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  public checkoutForm:  FormGroup;
  public products: Product[] = [];
  public payPalConfig ? : IPayPalConfig;
  public payment: string = 'Stripe';
  public amount:  any;
  deliveryAddressCheck=true
  stripeTest: FormGroup;
  constructor(
    private fb: FormBuilder,
    public productService: ProductService,
    private orderService: OrderService,
    private CategoryDataService: CategoryDataService,
    private CartDataService: CartDataService,
    private AppUrlsService: AppUrlsService
    ) { 
    this.checkoutForm = this.fb.group({
      fld_Country: ['', Validators.required],
      fld_City: ['', Validators.required],
      fld_State: [''],
      fld_Zip: ['', Validators.required],
      fld_Fname:  ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      fld_Lname:  ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      fld_Company: [''],
      fld_Address1: ['', [Validators.required, Validators.maxLength(200)]],
      fld_Address2: [''],
      fld_Email:  ['', [Validators.required, Validators.email]],
      fld_Phone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      fld_Proudt_Id: [''],
      fld_UnitPrice: [''],
      fld_Quntity: [''],
      fld_Discount: [''],
      fld_OrderNote: [''],
      fld_Total: [''],
      token: [''],
    })
  }

  allDeliveryOption:any
  deliveryamount=0
  ngOnInit(): void {
    this.productService.cartItems.subscribe(response => this.products = response);
    this.getTotal.subscribe(amount => this.amount = amount);
    this.initConfig();
    this.CategoryDataService.getallDeliveryOption().subscribe(res => {
      this.allDeliveryOption = res.body;
      if(!this.isObjectEmpty(this.allDeliveryOption)){
      for (let i = 0; i < this.allDeliveryOption.length; i++) {
        this.allDeliveryOption[i]['checked'] =false
          }
      this.allDeliveryOption[0]['checked'] =true
      this.deliveryamount = this.allDeliveryOption[0].fld_Amount;
        }
        console.log("Delivery options-->", this.allDeliveryOption)
      this.amount =Number(this.amount) + Number(this.deliveryamount);
      localStorage.setItem("delivertotatl", this.deliveryamount.toString())
    })
  }

  public get getTotal(): Observable<number> {
    return this.productService.cartTotalAmount();
  }

  updateDeliveryAddress(){
    if(this.deliveryAddressCheck){
      this.checkoutForm.controls['fld_Address2'].setValue(this.checkoutForm.controls.fld_Address1.value)
    }
  }

  deliveryAddressCheckFun(event){
    this.deliveryAddressCheck=event.target.checked
    if(this.deliveryAddressCheck){
      this.checkoutForm.controls['fld_Address2'].setValue(this.checkoutForm.controls.fld_Address1.value)
    }else{
      this.checkoutForm.controls['fld_Address2'].setValue('')
    }
  }

    // Paypal Payment Gateway
  private initConfig(): void {
      this.payPalConfig = {
          currency: this.productService.Currency.currency,
          clientId: environment.paypal_token,
          createOrderOnClient: (data) => < ICreateOrderRequest > {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                  currency_code: this.productService.Currency.currency,
                  value: this.amount,
                  breakdown: {
                      item_total: {
                          currency_code: this.productService.Currency.currency,
                          value: this.amount
                      }
                  }
                }
            }]
        },
          advanced: {
              commit: 'true'
          },
          style: {
              label: 'paypal',
              size:  'small', // small | medium | large | responsive
              shape: 'rect', // pill | rect
          },
          onApprove: (data, actions) => {
              this.orderService.createOrder(this.products, this.checkoutForm.value, data.orderID, this.getTotal);
              console.log('onApprove - transaction was approved, but not authorized', data, actions);
              actions.order.get().then(details => {
                  console.log('onApprove - you can get full order details inside onApprove: ', details);
              });
          },
          onClientAuthorization: (data) => {
              console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
          },
          onCancel: (data, actions) => {
              console.log('OnCancel', data, actions);
          },
          onError: err => {
              console.log('OnError', err);
          },
          onClick: (data, actions) => {
              console.log('onClick', data, actions);
          }
      };
    }

  // Stripe Payment Gateway
  stripeCheckout() {
    // if (this.checkoutForm.invalid) {
    //   // return;
    // }
    var handler = (<any>window).StripeCheckout.configure({
      key: environment.stripe_token, // publishble key
      locale: 'auto',
      currency: "GBP",
      token: (token: any) => {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        //  this.orderService.createOrder(this.products, this.checkoutForm.value, token.id, this.amount);
        this.proceedCheckout(this.products, token.id, this.amount);
      }
    });
    handler.open({
      name: 'GkTies',
      description: 'Payment For Purchase',
      amount: this.amount * 100
    }) 
  }

   //Existing Project Methods 
  proceedCheckout(products, token, amount) {

    let id = "";
    let qty = "";
    let price = "";
    for (let index = 0; index < products.length; index++) {
      id = products[index].id + "-" + id;
      qty = products[index].quantity + "-" + qty;
      price = products[index].price + "-" + price;
    }
    this.checkoutForm.controls['fld_Proudt_Id'].setValue(id)
    this.checkoutForm.controls['fld_Quntity'].setValue(qty)
    this.checkoutForm.controls['fld_UnitPrice'].setValue(price)
    this.checkoutForm.controls['fld_Discount'].setValue(this.discountAmount)
    this.checkoutForm.controls['fld_Total'].setValue(amount)
    this.checkoutForm.controls['fld_OrderNote'].setValue('test')
    this.checkoutForm.controls['token'].setValue(token)
    this.CategoryDataService.proceedCheckout(this.checkoutForm.value).subscribe(res => {
    console.log('proceedCheckout-->',res);
    this.orderService.createOrder(this.products, this.checkoutForm.value, token.id, this.amount);
      })
  }

  coupon;
  lblmessage;
  response;
  discountAmount=0;
  couponId;

  hideError(){
    this.lblmessage=''
  }

  applyCoupon() {
    this.CategoryDataService.checkCouponCode(this.coupon).subscribe(res => {
      this.response = res.body;
      if (this.response.status == "notFound") {
        this.lblmessage = "Coupon Not Valid";
      }
      else if (this.response.status == "Expire") {
        this.lblmessage = "Coupon Already Use";
      }
      else if (this.response.status == "success") {
        this.lblmessage = "Coupon Applied";
        this.discountAmount = this.response.amount;
        this.couponId = this.response.id;
        if (this.response.type == "flat") {
          this.amount =Number(this.amount) - Number(this.discountAmount);
        }
      }
    })
  }

  deliveryOption(index,amount) {
    for (let i = 0; i < this.allDeliveryOption.length; i++) {
      this.allDeliveryOption[i]['checked'] =false
        }
    this.allDeliveryOption[index]['checked'] =true
    this.amount =Number(this.amount) - Number(this.deliveryamount);
    this.deliveryamount = amount;
    this.amount =Number(this.amount) + Number(this.deliveryamount);
    localStorage.setItem("delivertotatl", this.deliveryamount.toString())
  }

  isObjectEmpty(Obj) {
    for (var key in Obj) {
        if (Obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
}
