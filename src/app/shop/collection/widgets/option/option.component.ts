import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../../../shared/classes/product';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss']
})
export class OptionComponent implements OnInit {

  @Input() products: Product[] = [];
  @Input() option: any[] = [];
  
  @Output() optionFilter  : EventEmitter<any> = new EventEmitter<any>();

  public collapse: boolean = true;

  constructor() { 
  }

  ngOnInit(): void {
  }

  get filterbyoption() {
    const uniqueOption = ['Multibuy','MostPopular','New' ]
    // this.products.filter((product) => {
    //   product.variants.filter((variant) => {
    //     if (variant.option) {
    //       const index = uniqueoption.indexOf(variant.option)
    //       if (index === -1) uniqueoption.push(variant.option)
    //     }
    //   })
    // })
    return uniqueOption
  }

  appliedFilter(event) {
    let index = this.option.indexOf(event.target.value);  // checked and unchecked value
    if (event.target.checked)   
      this.option.push(event.target.value); // push in array cheked value
    else 
      this.option.splice(index,1);  // removed in array unchecked value  
    
    let option = this.option.length ? { option: this.option.join(",") } : { option: null }; 
    this.optionFilter.emit(option);
  }

  // check if the item are selected
  checked(item){
    if(this.option.indexOf(item) != -1){
      return true;
    }
  }

}
