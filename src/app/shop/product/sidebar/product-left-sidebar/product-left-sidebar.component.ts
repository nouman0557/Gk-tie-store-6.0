import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDetailsMainSlider, ProductDetailsThumbSlider } from '../../../../shared/data/slider';
import { Product } from '../../../../shared/classes/product';
import { ProductService } from '../../../../shared/services/product.service';
import { SizeModalComponent } from "../../../../shared/components/modal/size-modal/size-modal.component";
import { CategoryDataService } from 'src/app/services/shoping-cart/category.service';
import { AppUrlsService } from 'src/app/services/shared/app-urls.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-left-sidebar',
  templateUrl: './product-left-sidebar.component.html',
  styleUrls: ['./product-left-sidebar.component.scss']
})
export class ProductLeftSidebarComponent implements OnInit {

  public product:any// Product={};
  public counter: number = 1;
  public activeSlide: any = 0;
  public selectedSize: any;
  public mobileSidebar: boolean = false;

  @ViewChild("sizeChart") SizeChart: SizeModalComponent;
  
  public ProductDetailsMainSliderConfig: any = ProductDetailsMainSlider;
  public ProductDetailsThumbConfig: any = ProductDetailsThumbSlider;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      public productService: ProductService,
      private CategoryDataService: CategoryDataService,
      private AppUrlsService: AppUrlsService,
      private formbulider: FormBuilder,
      private toastrService: ToastrService,

      ) {   }


    ///=================== Review Work =====================//
  title = "CodeSandbox";
  arr: any[] = [];
  selectedRate:number = -1;
  reviewForm:any
  productId=''
  initilizeReviewForm(){
      this.reviewForm = this.formbulider.group({
        productId: [this.productId, [Validators.required]],  
        reviewEmail: ['', [Validators.required, Validators.email]],  
        reviewUserName: ['', [Validators.required]],  
        reviewTitle: ['', [Validators.required]],  
        reviewDescription: [''],  
        reviewNumber: ['', [Validators.required]],  
      }); 

    }

  onClickItem(index) {
    this.reviewForm.controls['reviewNumber'].setValue(Number(index+1))
    this.selectedRate=index
  }

  reviewFormValidError=false
  submitReview(){
    if (this.reviewForm.invalid) {
      this.reviewFormValidError = true;
      return
    }
    this.reviewFormValidError = false;
    let formInput = JSON.parse(JSON.stringify(this.reviewForm.value))
    this.CategoryDataService.addReview(formInput).subscribe(res => {
      this.toastrService.success('Review added Successfully. Thank you');
      this.initilizeReviewForm()
      this.selectedRate=0
    })
  }

   get fReviewForm() {
    return this.reviewForm.controls; 
   
   }
  //===================================== End Review =========================//
  categoryID=''
  ngOnInit(): void {
    this.productId=this.route.snapshot.paramMap.get('slug');
    this.initilizeReviewForm()
    this.arr = [1, 2, 3, 4, 5];
    this.CategoryDataService.getProductDetails(this.productId).subscribe(res => {
      this.categoryID=res.body['tbl_gk_Category'].Id
      let newProduct=JSON.parse(JSON.stringify(res.body)) ;
      console.log('Product From DB-->',newProduct);
        let product={}
        product['id']= newProduct['Id']
        product['title']=newProduct['fld_Name']
        product['description']=newProduct['fld_Description']
        product['type']="fashion"
        product['brand']=newProduct['fld_Style']
        product['collection']=["New Product"];
        product['category']=newProduct['Id']
        product['price']=newProduct['fld_Price']
        product['sale']=false
        product['discount']=0
        product['code']=newProduct['fld_ItemCode']
        product['pattern']=newProduct['fld_Pattern']
        product['material']=newProduct['fld_Material']
        product['width']=newProduct['fld_Width']
        product['stock']=newProduct['fld_Quentity']
        product['new']=newProduct['fld_Option']=='New'?true:false;
        product['quantity']=0
        product['rating']=this.getRatingNumber(newProduct['tbl_gk_reviews'])
        product['tags']=[
           "new",
            "s",
            "m",
            "black",
            "white",
            "pink",
            "nike"
      ];
      product['variants']=newProduct['fld_Color']=="lilac"?"violet":newProduct['fld_Color']
      product['images']=[];
        let tags={}
        let variants={}
        variants['variant_id']=0
        variants['id']=0
        variants['sku']=""
        variants['size']="s"
        variants['color']=newProduct['fld_Color']=="lilac"?"violet":newProduct['fld_Color']
        variants['image_id']=0
        let imageString: String=newProduct['fld_Images']
        let imageArray=imageString.split(","); 
        for(let j = 0; j < imageArray.length; j++){
          let images={}
           images['image_id']=j
           images['id']=j
           images['alt']=newProduct['fld_Name']
           images['src']=`${this.AppUrlsService.domain}/Images/Product/${imageArray[j]}`
           images['variant_id']= 
        product['images'].push(images)
      }
        product['tags'].push(tags)
        // product['variants'].push(variants)
      this.product=product
      console.log('Product Details-->',this.product);
    })
  }

  // Get Product Color
  Color(variants) {
    const uniqColor = []
    for (let i = 0; i < Object.keys(variants).length; i++) {
      if (uniqColor.indexOf(variants[i].color) === -1 && variants[i].color) {
        uniqColor.push(variants[i].color)
      }
    }
    return uniqColor
  }

  // Get Product Size
  Size(variants) {
    const uniqSize = []
    for (let i = 0; i < Object.keys(variants).length; i++) {
      if (uniqSize.indexOf(variants[i].size) === -1 && variants[i].size) {
        uniqSize.push(variants[i].size)
      }
    }
    return uniqSize
  }

  selectSize(size) {
    this.selectedSize = size;
  }
  
  // Increament
  increment() {
    this.counter++ ;
  }

  // Decrement
  decrement() {
    if (this.counter > 1) this.counter-- ;
  }

  // Add to cart
  async addToCart(product: any) {
    product.quantity = this.counter || 1;
    const status = await this.productService.addToCart(product);
    if(status)
      this.router.navigate(['/shop/cart']);
  }

  // Buy Now
  async buyNow(product: any) {
    product.quantity = this.counter || 1;
    const status = await this.productService.addToCart(product);
    if(status)
      this.router.navigate(['/shop/checkout']);
  }

  // Add to Wishlist
  addToWishlist(product: any) {
    this.productService.addToWishlist(product);
  }

  // Toggle Mobile Sidebar
  toggleMobileSidebar() {
    this.mobileSidebar = !this.mobileSidebar;
  }

  getRatingNumber(data){
    let count=0
    let reviewNumber=0
    for (let i = 0; i < data.length; i++) {
        count=count+1
        reviewNumber= data[i]['reviewNumber'] + reviewNumber
     }
     let number=Math.round(reviewNumber/count)
    return number
}

}
