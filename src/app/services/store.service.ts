import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private myShoppingCartProducts: Product[] = []

  private myCart = new BehaviorSubject<Product[]>([])

  myCart$ = this.myCart.asObservable()

  GetMyShoppingCartProducts(){
    return this.myShoppingCartProducts
  }

  AddProduct(product: Product){
    this.myShoppingCartProducts.push(product)
    this.myCart.next(this.myShoppingCartProducts)
  }

  GetTotal(){
    return this.myShoppingCartProducts.reduce((suma, item) => suma + item.price,0)
  }
}
