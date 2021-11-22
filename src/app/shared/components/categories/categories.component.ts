import { Component, OnInit } from '@angular/core';
import { Product } from '../../classes/product';
import { ProductService } from '../../services/product.service';
import { CategoryDataService } from 'src/app/services/shoping-cart/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  public products: Product[] = [];
  public collapse: boolean = true;

  constructor(
    public productService: ProductService,
    private CategoryDataService: CategoryDataService,
    
    ) { 
   // this.productService.getProducts.subscribe(product => this.products = product);
  }

  ngOnInit(): void {
   this.getCategory()
  }

  categoryNames=[]
  getCategory(){
    this.CategoryDataService.getCategoryList().subscribe(res => {
      if( res.body !=null ||res.body !=undefined){
        let categoryData=JSON.parse(JSON.stringify(res.body)) ;
        for (let i = 0; i < categoryData.length; i++) {
          let obj={}
          obj['Name']=categoryData[i]['fld_Name']
          obj['id']=categoryData[i]['Id']
          this.categoryNames.push(obj)
            }
      }else{
        this.categoryNames=[
          'No Category Found'
        ]
      }
    })
  }

  get filterbyCategory() {
    // let cat=[]
    // this.CategoryDataService.getCategoryList().subscribe(res => {
    //   if( res.body !=null ||res.body !=undefined){
    //     let categoryData=JSON.parse(JSON.stringify(res.body)) ;
    //     for (let i = 0; i < categoryData.length; i++) {
    //       cat.push(categoryData[i]['fld_Name'])
    //         }
    //   }else{
    //     cat=[
    //       'No Category Found'
    //     ]
    //   }
    // })
    const category=this.categoryNames
    return category
    // const category = [...new Set(this.products.map(product => product.type))]
   
  }

}
