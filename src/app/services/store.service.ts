import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject } from 'rxjs'
import { GetUserEmailDTO, User } from '../models/users.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private myShoppingCartProducts: Product[] = []

  private myCart = new BehaviorSubject<Product[]>([])
  myCart$ = this.myCart.asObservable()

  private profile = new BehaviorSubject<GetUserEmailDTO[]>([])
  profile$ = this.profile.asObservable()

  GetMyShoppingCartProducts() {
    return this.myShoppingCartProducts
  }

  AddProduct(product: Product) {
    this.myShoppingCartProducts.push(product)
    this.myCart.next(this.myShoppingCartProducts)
  }

  GetTotal() {
    return this.myShoppingCartProducts.reduce((suma, item) => suma + item.price, 0)
  }

  sharedProfile(profile: any) {
    this.profile.next(profile)
  }
}
