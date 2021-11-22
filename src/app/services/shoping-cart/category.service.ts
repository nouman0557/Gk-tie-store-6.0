import { Injectable } from "@angular/core";
import { AppHttpClient } from '../auth-services/http-client.service';
import { AppUrlsService } from '../shared/app-urls.service';

@Injectable()
export class CategoryDataService {

    private domain = `${this.appUrlsService.domain}`;
    private urls = {
        getAllCategory: `${this.domain}/api/CategoryProuduct/AllCategory`,
        newArrialveLink: `${this.domain}/api/CategoryProuduct/AllNewArrivalProudct`,
        newArrialveLinkall: `${this.domain}/api/CategoryProuduct/GetAllNewArrival`,
        getAllCategoryProudct: `${this.domain}/api/CategoryProuduct/CategoryProduct`,
        getAllCategoryCountProudct: `${this.domain}/api/CategoryProuduct/CategoryCountDetailsProduct`,
        ProductDetails: `${this.domain}/api/CategoryProuduct/ProductDetails`,
        NewArrivals: `${this.domain}/api/CategoryProuduct/NewProductArrival`,
        wishList: `${this.domain}/api/Wishlist/Get`,
        payment: `${this.domain}/api/BookingPayment/MakePayment`,
        coupon: `${this.domain}/api/Coupon/CheckCoupon`,
        Checkout: `${this.domain}/api/BookingPayment/SaveShippingDetails`,
        urlFilterByColor: `${this.domain}/api/CategoryProuduct/CategoryProductByColor`,
        urlFilterByStyle: `${this.domain}/api/CategoryProuduct/CategoryProductByStyle`,
        urlFilterByPattern: `${this.domain}/api/CategoryProuduct/CategoryProductByPattern`,
        urlFilterByWidth: `${this.domain}/api/CategoryProuduct/CategoryProductByWidth`,
        urlFilterByMatrial: `${this.domain}/api/CategoryProuduct/CategoryProductByMatrial`,
        urlFilterByPrice: `${this.domain}/api/CategoryProuduct/CategoryProductByprice`,
        urlDeliveryOption: `${this.domain}/api/PageSection/GetDeliveryOption`,
        urlGetUserProfile: `${this.domain}/api/Authorization/GetUserProfile?email`,
        urlGetUserOrderHistory: `${this.domain}/api/BookingPayment/FetchOrderHistory?userEmail`,
        addReview: `${this.domain}/api/Reviews/AddReview`,
        getAllReviews: `${this.domain}/api/Reviews/GetAllReviews`,
    }

    constructor(
        private http: AppHttpClient, 
        private appUrlsService: AppUrlsService,
        ) {
    }


    public addReview(data){
        return this.http.post(this.urls.addReview, data);
    }

    getAllReviews(){
        return this.http.get(`${this.urls.getAllReviews}`);
    }

    // getUserProfile?email=email@gmail.com
    getUserProfile(email){
        return this.http.get(`${this.urls.urlGetUserProfile}=${email}`);
    }

    getUserOrderHistory(email){
        return this.http.get(`${this.urls.urlGetUserOrderHistory}=${email}`);
    }

    getCategoryList() {
        return this.http.get(`${this.urls.getAllCategory}`);
    }
    getLastNewArrival() {
        return this.http.get(`${this.urls.newArrialveLink}`);
    }
    getAllLastNewArrival() {
        return this.http.get(`${this.urls.newArrialveLinkall}`);
    }
    getCategoryProudct(id) {
        return this.http.get(`${this.urls.getAllCategoryProudct}/${id}`);
    }
    getWishlistProduct(id) {
        return this.http.get(`${this.urls.wishList}/${id}`);
    }
    getFilterCategoryProudctByColor(id, color) {
        return this.http.get(`${this.urls.urlFilterByColor}?Id=${id}&color=${color}`);
    }
    getFilterCategoryProudctByStyle(id, style) {
        return this.http.get(`${this.urls.urlFilterByStyle}?Id=${id}&style=${style}`);
    }
    getFilterCategoryProudctByPattern(id, pattern) {
        return this.http.get(`${this.urls.urlFilterByPattern}?Id=${id}&pattern=${pattern}`);
    }
    getFilterCategoryProudctByWidth(id, width) {
        return this.http.get(`${this.urls.urlFilterByWidth}?Id=${id}&width=${width}`);
    }
    getFilterCategoryProudctByMatrial(id, matrial) {
        return this.http.get(`${this.urls.urlFilterByMatrial}?Id=${id}&matril=${matrial}`);
    }
    getFilterCategoryProudctByPrice(id, price) {
        return this.http.get(`${this.urls.urlFilterByPrice}?Id=${id}&price=${price}`);
    }
    getCategoryCountProudct(id) {
        return this.http.get(`${this.urls.getAllCategoryCountProudct}/${id}`);
    }
    getProductDetails(id) {
        return this.http.get(`${this.urls.ProductDetails}/${id}`);
    }
    getNewArrival(id) {
        return this.http.get(`${this.urls.NewArrivals}/${id}`);
    }
    makePayment(id) {
        return this.http.get(`${this.urls.payment}/${id}`);
    }
    checkCouponCode(id) {
        return this.http.get(`${this.urls.coupon}/${id}`);
    }
    proceedCheckout(data) {
        return this.http.post(this.urls.Checkout, data);
    }
    getallDeliveryOption() {
        return this.http.get(`${this.urls.urlDeliveryOption}`);
    }

    getAllProduct():any {
      let allProducts=[]
      let data = this.http.get(`${this.urls.getAllCategory}`);
      data.subscribe(res=>{
        let categoryData=JSON.parse(JSON.stringify(res.body)) ;
      for (let c = 0; c < categoryData.length;c++) {
        let category={}
        category['products']=[]
        category['Id']=categoryData[c]['Id']
        category['$id']=categoryData[c]['$id']
        category['fld_Name']=categoryData[c]['fld_Name']
        category['fld_UpdateAt']=categoryData[c]['fld_UpdateAt']
        category['fld_CreateAt']=categoryData[c]['fld_CreateAt']
        category['fld_Description']=categoryData[c]['fld_Description']
        category['fld_Image']=`${this.appUrlsService.domain}/Images/Product/${categoryData[c]['fld_Image']}` 
        let newProduct=JSON.parse(JSON.stringify(res['body'][c]['tbl_gk_Product'])) ;
        for (let i = 0; i < newProduct.length; i++) {
          if( newProduct[i]['Id']!=undefined && newProduct[i]['fld_Name']!=undefined){
          let product={}
          product['id']= newProduct[i]['Id']
          product['title']=newProduct[i]['fld_Name']
          product['description']=newProduct[i]['fld_Description']
          product['type']="fashion"
          product['brand']=newProduct[i]['fld_Style']
          product['collection']=["New Product"];
          product['category']=newProduct[i]['Id']
          product['price']=newProduct[i]['fld_Price']
          product['sale']=false
          product['discount']=0
          product['stock']=newProduct[i]['fld_Quentity']
        product['new']=newProduct['fld_Option']=='New'?true:false;
        product['quantity']=0
        product['rating']=this.getRatingNumber(newProduct[i]['tbl_gk_reviews'])
          product['tags']=[
             "new",
              "s",
              "m",
              "black",
              "white",
              "pink",
              "nike"
        ];
        product['variants']=[];
        product['images']=[];
  
          let tags={}
          let variants={}
          variants['variant_id']=i
          variants['id']=i
          variants['sku']=""
          variants['size']="s"
          variants['color']=newProduct[i]['fld_Color']=="lilac"?"violet":newProduct[i]['fld_Color']
          variants['image_id']=i
          let imageString: String=newProduct[i]['fld_Images']
          let imageArray=imageString.split(","); 
          for(let j = 0; j < imageArray.length; j++){
            let images={}
             images['image_id']=j
             images['id']=j
             images['alt']=newProduct[i]['fld_Name']
             images['src']=`${this.appUrlsService.domain}/Images/Product/${imageArray[j]}`
             images['variant_id']= [i]
          product['images'].push(images)
        }
  
          product['tags'].push(tags)
          product['variants'].push(variants)
          // product['images'].push(images)
          allProducts.push(product)
        }
      }
       }
        return  JSON.parse(JSON.stringify(allProducts))
    })
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