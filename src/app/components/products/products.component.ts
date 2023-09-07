import { Component } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  myShoppingCartProducts: Product[] = []
  total: number = 0

  products: Product[] = [];

  fechaHoy = new Date()

  constructor(private storeService: StoreService,
              private productService: ProductService) {
    this.myShoppingCartProducts = this.storeService.GetMyShoppingCartProducts()
   }

  ngOnInit(): void {
    this.productService.GetAllProducts().subscribe(
      response => {
        console.log(response)
        this.products = response
      },
      error => {

      }
    )
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.AddProduct(product)
    this.total = this.storeService.GetTotal()
  }

}
