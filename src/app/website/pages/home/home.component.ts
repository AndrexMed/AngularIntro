import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { retry } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: Product[] = [];

  limit = 5
  offset = 0

  productId: string | null = null

  constructor(private productService: ProductService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.productService.GetAllProducts(this.limit, this.offset).subscribe(
      (data) => {
        console.log(data)
        this.products = data;
        this.offset += this.limit;
      });
      this.route.queryParamMap.subscribe(params => {
        this.productId = params.get('product')
        console.log(this.productId)
      })
  }

  onLoadMore() {
    this.productService.GetAllProducts(this.limit, this.offset).subscribe((data) => {
      this.products = this.products.concat(data);
      this.offset += this.limit;
    });
  }

}

