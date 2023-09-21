import { HttpClient, HttpErrorResponse, HttpParams, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateProductDTO, Product, UpdateProductDTO } from '../models/product.model';
import { catchError, map, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private APIURL = `${environment.API_URL}`;

  private apiUrl = "https://fakestoreapi.com/products"
  private apiUrl2 = "https://api.escuelajs.co/api/v1/products"


  constructor(private http: HttpClient) { }

  GetAllProducts(limit?: string, offset?: string) {

    let params = new HttpParams()

    if (limit && offset) {
      params = params.set("limit", limit)
      params = params.set("offset", offset)
    }
    return this.http.get<Product[]>(this.APIURL, {params} )
    // .pipe(retry(3)) no funciono aqui
  }

  GetProduct(id: string) {
    return this.http.get<Product>(`${this.APIURL}/${id}`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Conflict) {
          return throwError('Algo esta fallando en el server');
        }
        if (error.status === HttpStatusCode.NotFound) {
          return throwError('El producto no existe');
        }
        if (error.status === HttpStatusCode.Unauthorized) {
          return throwError('No estas permitido');
        }
        return throwError('Ups algo salio mal');
      })
    )
  }

  create(product: CreateProductDTO) {
    return this.http.post<Product>(this.APIURL, product)
  }

  update(id: string, dto: UpdateProductDTO) {
    return this.http.put<Product>(`${this.APIURL}/${id}`, dto)
  }

  delete(id: string) {
    return this.http.delete<boolean>(`${this.APIURL}/${id}`)
  }

  getsProductsByPage(limit: number, offset: number) {
    return this.http.get<Product[]>(this.APIURL, { params: { limit, offset } })
    .pipe(
      map(products => products.map(item => {
        return {
          ...item,
          taxes: .19 * item.price
        }
      }))
    )
  }

}
