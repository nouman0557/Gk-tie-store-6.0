import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../../../shared/classes/product';
import { ProductService } from '../../../../shared/services/product.service';
import { IndexDataServcies } from 'src/app/services/index/IndexDataService.service';
import { AppUrlsService } from 'src/app/services/shared/app-urls.service';
import { CategoryDataService } from 'src/app/services/shoping-cart/category.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-related-product',
  templateUrl: './related-product.component.html',
  styleUrls: ['./related-product.component.scss']
})
export class RelatedProductComponent implements OnInit {
  
  @Input() type: string

  public products: Product[] = [];

  constructor(
    private IndexDataServcies: IndexDataServcies,
    private AppUrlsService: AppUrlsService,
    public productService: ProductService,
    private _CategoryDataService:CategoryDataService,
    private router: Router,
    private route: ActivatedRoute,
  ) { 
    // this.productService.getProducts.subscribe(response => 
    //   this.products = response.filter(item => item.type == this.type)
    // );
  }

  ngOnInit(): void {
    this.getNewArrivalsproducts()
  }
  getNewArrivalsproducts(){
   let id= Number(this.type)
    this._CategoryDataService.getNewArrival(id).subscribe(res => {
      console.log('getNewArrival in related Pro-->',res.body);
      let newProduct=JSON.parse(JSON.stringify(res.body)) ;
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
           images['src']=`${this.AppUrlsService.domain}/Images/Product/${imageArray[j]}`
           images['variant_id']= [i]
        product['images'].push(images)
      }

        product['tags'].push(tags)
        product['variants'].push(variants)
          this.products.push(product)
      }
    }
      
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
