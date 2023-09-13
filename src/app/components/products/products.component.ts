import { Component } from '@angular/core';
import { Product, CreateProductDTO } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  myShoppingCartProducts: Product[] = []
  total = 0

  products: Product[] = [];

  fechaHoy = new Date()

  showProductDetail = false

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
        console.log(error)
      }
    )
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.AddProduct(product)
    this.total = this.storeService.GetTotal()
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail
  }

  onShowDetail(id: string) {
    console.log(id)
    this.productService.GetProduct(id).subscribe(
      data => {
        console.log(data)
      }
    )
  }

  createNewProduct() {
    const product: CreateProductDTO = {
      title: "New Product",
      price: 12345,
      images: ["adfdsfs"],
      description: "Description newProduct",
      categoryId: 2
    }
    this.productService.create(product).subscribe(data => {
      console.log("Create data: ", data)
    })
  }

}
