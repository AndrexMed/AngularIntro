import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private myShoppingCartProducts: Product[] = []

  constructor() { }

  GetMyShoppingCartProducts(){
    return this.myShoppingCartProducts
  }

  AddProduct(product: Product){
    this.myShoppingCartProducts.push(product)
  }

  GetTotal(){
    return this.myShoppingCartProducts.reduce((suma, item) => suma + item.price,0)
  }
}
