import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject } from 'rxjs'
import { GetUserEmailDTO, User } from '../models/users.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private myShoppingCart: Product[] = []

  private myCart = new BehaviorSubject<Product[]>([])
  myCart$ = this.myCart.asObservable()



  GetMyShoppingCartProducts() {
    return this.myShoppingCart
  }

  AddProduct(product: Product) {
    this.myShoppingCart.push(product)
    this.myCart.next(this.myShoppingCart)
  }

  GetTotal() {
    return this.myShoppingCart.reduce((suma, item) => suma + item.price, 0)
  }

  // private profile = new BehaviorSubject<GetUserEmailDTO[]>([])
  // profile$ = this.profile.asObservable()
  sharedProfile(profile: any) {
    // this.profile.next(profile)
  }
}
