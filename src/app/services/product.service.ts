import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = "https://fakestoreapi.com/products"
  private apiUrl2 = "https://api.escuelajs.co/api/v1/products"

  constructor(private http: HttpClient) { }

  GetAllProducts(){
    return this.http.get<Product[]>(this.apiUrl2)
  }

  GetProduct(id: string){
    return this.http.get<Product>(`${this.apiUrl2}/${id}`)
  }
}
