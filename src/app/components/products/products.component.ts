import { Component, EventEmitter, Input, Output } from '@angular/core';
import { switchMap, zip } from 'rxjs';
import { Product, CreateProductDTO, UpdateProductDTO } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  @Input() products: Product[] = [];
  @Output() loadMore = new EventEmitter();

  myShoppingCartProducts: Product[] = []
  total = 0

  fechaHoy = new Date()

  showProductDetail = false

  productChosen: Product | null = null

  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';

  constructor(private storeService: StoreService,
    private productService: ProductService) {
    this.myShoppingCartProducts = this.storeService.GetMyShoppingCartProducts()
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.AddProduct(product)
    this.total = this.storeService.GetTotal()
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail
  }

  onShowDetail(id: string) {
    this.statusDetail = 'loading';
    this.toggleProductDetail();
    // console.log(id)
    this.productService.GetProduct(id)
      .subscribe(
        data => {
          // console.log(data)
          // this.toggleProductDetail();
          this.productChosen = data;
          this.statusDetail = 'success';
        },
        error => {
          console.log(error)
          window.alert(error)
          this.statusDetail = 'error';
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

  updateProduct() {
    if (this.productChosen) {
      const changes: UpdateProductDTO = {
        title: "Nuevo Titulo",
        images: ["https://source.unsplash.com/random", "https://source.unsplash.com/random", "https://source.unsplash.com/random"],
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore consequuntur magnam dolorem earum nemo cupiditate a voluptates fugiat ipsa voluptatibus!" 
      }
      const id = this.productChosen?.id
      this.productService.update(id, changes)
        .subscribe(data => {
          console.log("Update: ", data)
          const productIndex = this.products.findIndex(item => item.id === this.productChosen?.id)
          this.products[productIndex] = data
        })
    }
  }

  deleteProduct() {
    if (this.productChosen) {
      const id = this.productChosen.id
      this.productService.delete(id).subscribe(
        () => {
          const productIndex = this.products.findIndex(item => item.id === this.productChosen?.id)
          this.products.splice(productIndex, 1)
          this.showProductDetail = false
        }
      )
    }
  }

  onLoadMore() {
    this.loadMore.emit()
  }

  //Esto hay que evitarlo ya que podriamos caer en el callback hell
  readAndUpdate(id: string) {
    this.productService.GetProduct(id).subscribe(
      response => {
        const product = response
        this.productService.update(product.id, { title: "Change" })
          .subscribe(
            respuestaUpdate => {
              console.log(respuestaUpdate)
            }
          )
      }
    )
  }

  //switchMap se utiliza cuandp hay dependencias, es decir, cuando una consula depende de otra
  readAndUpdate2(id: string) {
    this.productService.GetProduct(id)
      .pipe(
        switchMap((product) => this.productService.update(product.id, { title: "Change" })),
        switchMap((product) => this.productService.update(product.id, { title: "Change" }))
      )
      .subscribe(response => {
        console.log(response)
      },
        error => {
          console.log(error)
        })
  }

  readAndUpdate3(id: string) {
    // Crea observables para las operaciones
    const getProductObservable = this.productService.GetProduct(id);
    const updateObservable = this.productService.update(id, { title: "Nuevo titulo" });

    // Combina los observables usando zip
    zip(getProductObservable, updateObservable).subscribe(([getProductResponse, updateResponse]) => {
      // Maneja las respuestas aquí
      // getProductResponse es la respuesta de GetProduct
      // updateResponse es la respuesta de la operación de actualización
      console.log(getProductResponse);
      console.log(updateResponse);
    });
  }

  readAndUpdate4(id: string) {
    this.productService.fetchReadAndUpdate(id, { title: 'change' })
      .subscribe(response => {
        const read = response[0];
        const update = response[1];
      })
  }

}
