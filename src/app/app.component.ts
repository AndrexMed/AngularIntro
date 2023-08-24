import { Component } from '@angular/core';

import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  //https://source.unsplash.com/random
  imgParent = '';
  showImg = true

  products: Product[] = [
    {
    id: "1",
    name: "Product 1",
    price: 500,
    img: "https://source.unsplash.com/random"
  },
  {
    id: "2",
    name: "Product 2",
    price: 600,
    img: "https://source.unsplash.com/random"
  },
  {
    id: "3",
    name: "Product 3",
    price: 700,
    img: "https://source.unsplash.com/random"
  }
]

  onLoaded(img: string) {
    console.log("Log padre: " + img)
  }

  toggleImg(){
    this.showImg = !this.showImg
  }

}
