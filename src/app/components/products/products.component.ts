import { Component } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  products: Product[] = [
    {
      id: '1',
      name: 'EL mejor juguete',
      price: 565,
      img: 'https://source.unsplash.com/random'
    },
    {
      id: '2',
      name: 'Bicicleta casi nueva',
      price: 356,
      img: 'https://source.unsplash.com/random'
    },
    {
      id: '3',
      name: 'Colleción de albumnes',
      price: 34,
      img: 'https://source.unsplash.com/random'
    },
    {
      id: '4',
      name: 'Mis libros',
      price: 23,
      img: 'https://source.unsplash.com/random'
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }
  
}
