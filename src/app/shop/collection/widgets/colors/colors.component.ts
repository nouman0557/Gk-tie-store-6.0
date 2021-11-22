import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../../../shared/classes/product';

@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.scss']
})
export class ColorsComponent implements OnInit {

  @Input() products: Product[] = [];
  @Input() colors: any[] = [];

  @Output() colorsFilter  : EventEmitter<any> = new EventEmitter<any>();
  
  public collapse: boolean = true;

  constructor() { 
  }

  ngOnInit(): void {
  }

  get filterbycolor() {
    const uniqueColors = []
    this.products.filter((product) => {
      product.variants.filter((variant) => {
        if (variant.color) {
          const index = uniqueColors.indexOf(variant.color)
          if (index === -1) uniqueColors.push(variant.color)
        }
      })
    })
    return uniqueColors
  }

  appliedFilter(color) { 
    let obj={}
    obj['Color']=color
    this.colorsFilter.emit(obj);
  }

  // check if the item are selected
  checked(item){
    if(this.colors.indexOf(item) != -1){
      return true;
    }
  }

}
