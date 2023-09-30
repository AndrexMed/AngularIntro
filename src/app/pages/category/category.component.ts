import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-category',
  template: `<app-products [products]="products"></app-products>`,
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  products: Product[] = [];
  categoryId: string | null = null
  limit = 5
  offset = 0


  constructor(private route: ActivatedRoute,
    private productService: ProductService) {
  }

  ngOnInit(): void {
    //Doble suscribe
    // this.route.paramMap.subscribe(params => {
    //   this.categoryId = params.get("id")
    //   if (this.categoryId) {
    //     this.productService.GetProductsByCategory(this.categoryId, this.limit, this.offset)
    //       .subscribe(data => {
    //         this.products = data
    //         console.log(data)
    //       })
    //     console.log(this.categoryId)
    //   }
    // })

    //switchMap
    this.route.paramMap
      .pipe(
        switchMap(params => {
          this.categoryId = params.get("id")
          if (this.categoryId) {
            return this.productService.GetProductsByCategory(this.categoryId, this.limit, this.offset)
          }
          return []
        })
      )
      .subscribe(data => {
        this.products = data
      })
  }

}
