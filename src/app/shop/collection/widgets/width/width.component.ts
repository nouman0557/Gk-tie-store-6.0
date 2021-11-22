import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../../../shared/classes/product';
@Component({
  selector: 'app-width',
  templateUrl: './width.component.html',
  styleUrls: ['./width.component.scss']
})
export class WidthComponent implements OnInit {

  @Input() products: Product[] = [];
  @Input() width: any[] = [];
  
  @Output() widthFilter  : EventEmitter<any> = new EventEmitter<any>();

  public collapse: boolean = true;

  constructor() { 
  }

  ngOnInit(): void {
  }

  get filterbywidth() {
    const uniqueWidth = ['Normal','Skinny' ]
    // this.products.filter((product) => {
    //   product.variants.filter((variant) => {
    //     if (variant.width) {
    //       const index = uniquewidth.indexOf(variant.width)
    //       if (index === -1) uniquewidth.push(variant.width)
    //     }
    //   })
    // })
    return uniqueWidth
  }

  // appliedFilter(event) {
  //   let index = this.width.indexOf(event.target.value);  // checked and unchecked value
  //   if (event.target.checked)   
  //     this.width.push(event.target.value); // push in array cheked value
  //   else 
  //     this.width.splice(index,1);  // removed in array unchecked value  
    
  //   let width = this.width.length ? { width: this.width.join(",") } : { width: null }; 
  //   this.widthFilter.emit(width);
  // }

  appliedFilter(Width) { 
    let obj={}
    obj['Width']=Width
    this.widthFilter.emit(obj);
  }
  // check if the item are selected
  checked(item){
    if(this.width.indexOf(item) != -1){
      return true;
    }
  }

}
