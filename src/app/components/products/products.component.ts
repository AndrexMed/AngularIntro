import { Component } from '@angular/core';
import { Product, CreateProductDTO, UpdateProductDTO } from 'src/app/models/product.model';
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

  productChosen: Product = {
    id: '',
    price: 0,
    images: [],
    title: '',
    category: {
      id: '',
      name: '',
    },
    description: ''
  };

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
        this.toggleProductDetail();
        this.productChosen = data;
      }
    )
  }

  createNewProduct() {
    const product: CreateProductDTO = {
      title: "New Product",
      price: 12345,
      images: ["https://source.unsplash.com/random"],
      description: "Description newProduct",
      categoryId: 2
    }
    this.productService.create(product).subscribe(data => {
      console.log("Create data: ", data)
      this.products.unshift(data)
    })
  }

  updateProduct(){
    const changes: UpdateProductDTO = {
      title: "Nuevo Titulo",
    }
    const id = this.productChosen.id
    this.productService.update(id, changes)
    .subscribe(data => {
      console.log("Update: ", data)
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id)
      this.products[productIndex] = data
    })
  }

}
