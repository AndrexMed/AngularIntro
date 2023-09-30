import { HttpClient, HttpErrorResponse, HttpParams, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateProductDTO, Product, UpdateProductDTO } from '../models/product.model';
import { catchError, map, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable, throwError, zip } from 'rxjs';
import { checkTime } from '../interceptors/time.interceptor';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private APIURL = `${environment.API_URL}`;
  private APIURL2 = `${environment.API_URL2}/api`;

  constructor(private http: HttpClient) { }

  GetProductsByCategory(categoryId: string, limit: number, offset: number): Observable<Product[]> {
    let params = new HttpParams()

    if (limit && offset != null) {
      params = params.set("limit", limit)
      params = params.set("offset", offset)
    }
    return this.http.get<Product[]>(`${this.APIURL}/categories/${categoryId}/products`, { params })
    // .pipe(
    //   map(products => {
    //     for (let i = 0; i < products.length; i++) {
    //       products[i].images = ["https://source.unsplash.com/random"];
    //     }
    //     return products;
    //   })
    // )
  }

  GetAllProducts(limit?: number, offset?: number) {

    let params = new HttpParams()

    if (limit && offset != null) {
      params = params.set("limit", limit)
      params = params.set("offset", offset)
    }
    return this.http.get<Product[]>(`${this.APIURL}/products`, { params, context: checkTime() })
      .pipe(
        retry(3),
        map(products => products.map(item => {
          return {
            ...item,
            taxes: .19 * item.price
          }
        }))
      )
  }

  GetProduct(id: string) {
    return this.http.get<Product>(`${this.APIURL}/products/${id}`)
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
    return this.http.get<Product[]>(this.APIURL, { params: { limit, offset }, context: checkTime() })
      .pipe(
        map(products => products.map(item => {
          return {
            ...item,
            taxes: .19 * item.price
          }
        }))
      )
  }

  fetchReadAndUpdate(id: string, dto: UpdateProductDTO) {
    return zip(
      this.GetProduct(id),
      this.update(id, dto)
    );
  }

}
