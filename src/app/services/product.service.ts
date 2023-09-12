import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl = "https://fakestoreapi.com/products"
  apiUrl2 = "https://api.escuelajs.co/api/v1/products/"

  constructor(private http: HttpClient) { }

  GetAllProducts(){
    return this.http.get<Product[]>(this.apiUrl2)
  }
}
