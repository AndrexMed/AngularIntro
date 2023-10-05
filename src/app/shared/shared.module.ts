import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//Pipes & Directives
import { ReversePipe } from './pipes/reverse.pipe';
import { TimesAgoPipe } from '../shared/pipes/times-ago.pipe';
import { HighlightDirective } from '../shared/directives/highlight.directive';

import { ImgComponent } from './components/img/img.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';

//PrimeNg
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { SidebarModule } from 'primeng/sidebar';
import { GalleriaModule } from 'primeng/galleria';

@NgModule({
  declarations: [
    ImgComponent,
    ProductComponent,
    ProductsComponent,
    ReversePipe,
    TimesAgoPipe,
    HighlightDirective,
  ],
  imports: [
    CommonModule,
    RouterModule,
    CardModule,
    ButtonModule,
    ImageModule,
    SidebarModule,
    GalleriaModule
  ],
  exports: [
    ImgComponent,
    ProductComponent,
    ProductsComponent,
    ReversePipe,
    TimesAgoPipe,
    HighlightDirective,
    CardModule,
    ButtonModule,
    ImageModule,
    SidebarModule,
    GalleriaModule
  ]
})
export class SharedModule { }
