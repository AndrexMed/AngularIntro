import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product.model'; 


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  @Input() product: Product = {
    id: '',
    price: 0,
    images: [],
    title: '',
    description: '',
    category: {
      id: "",
      name: ""
    }
  };

  @Output() addProduct = new EventEmitter<Product>()

  onAddToCart(){
    this.addProduct.emit(this.product)
  }

}
