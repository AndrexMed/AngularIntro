import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateProductDTO, Product, UpdateProductDTO } from '../models/product.model';

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

  create(product: CreateProductDTO){
    return this.http.post<Product>(this.apiUrl2, product)
  }

  update(id: string, dto: UpdateProductDTO){
    return this.http.put<Product>(`${this.apiUrl2}/${id}`, dto)
  }

}
