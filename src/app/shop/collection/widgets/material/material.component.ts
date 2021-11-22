import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../../../shared/classes/product';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss']
})
export class MaterialComponent implements OnInit {

  @Input() products: Product[] = [];
  @Input() material: any[] = [];
  
  @Output() materialFilter  : EventEmitter<any> = new EventEmitter<any>();

  public collapse: boolean = true;

  constructor() { 
  }

  ngOnInit(): void {
  }

  get filterbymaterial() {
    const uniqueMaterial = ['Polyester','Silk','Wool']
    // this.products.filter((product) => {
    //   product.variants.filter((variant) => {
    //     if (variant.material) {
    //       const index = uniquematerial.indexOf(variant.material)
    //       if (index === -1) uniquematerial.push(variant.material)
    //     }
    //   })
    // })
    return uniqueMaterial
  }

  // appliedFilter(event) {
  //   let index = this.material.indexOf(event.target.value);  // checked and unchecked value
  //   if (event.target.checked)   
  //     this.material.push(event.target.value); // push in array cheked value
  //   else 
  //     this.material.splice(index,1);  // removed in array unchecked value  
    
  //   let material = this.material.length ? { material: this.material.join(",") } : { material: null }; 
  //   this.materialFilter.emit(material);
  // }

  appliedFilter(Material) { 
    let obj={}
    obj['Material']=Material
    this.materialFilter.emit(obj);
  }

  // check if the item are selected
  checked(item){
    if(this.material.indexOf(item) != -1){
      return true;
    }
  }

}
