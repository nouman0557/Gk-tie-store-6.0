import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../../../shared/classes/product';
import { ProductService } from 'src/app/shared/services/product.service';
import { CategoryDataService } from 'src/app/services/shoping-cart/category.service';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.scss']
})
export class CategorieComponent implements OnInit {

  // @Input() products: Product[] = [];
  // @Input() brands: any[] = [];

  @Output() categoryFilter: EventEmitter<any> = new EventEmitter<any>();
  
  public collapse: boolean = true;

  constructor(
    public productService: ProductService,
    private CategoryDataService: CategoryDataService,
  ) { 
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

  appliedCatFilter(id) { 
    this.categoryFilter.emit(id);
  }


}
