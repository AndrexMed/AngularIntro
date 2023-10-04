import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteRoutingModule } from './website-routing.module';

//Pages
import { HomeComponent } from './pages/home/home.component';
import { CategoryComponent } from './pages/category/category.component';
import { MycartComponent } from './pages/mycart/mycart.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { LayaoutComponent } from './components/layout/layaout.component';
//Components
import { ImgComponent } from './components/img/img.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';
import { NavComponent } from './components/nav/nav.component';
//Pipes & Directives
import { ReversePipe } from './pipes/reverse.pipe';
import { TimesAgoPipe } from './pipes/times-ago.pipe';
import { HighlightDirective } from './directives/highlight.directive';
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
    NavComponent,
    ReversePipe,
    TimesAgoPipe,
    HighlightDirective,
    HomeComponent,
    CategoryComponent,
    MycartComponent,
    LoginComponent,
    RegisterComponent,
    RecoveryComponent,
    ProfileComponent,
    ProductDetailComponent,
    LayaoutComponent,
  ],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    ImageModule,
    SidebarModule,
    GalleriaModule,
    CardModule,
    ButtonModule
  ]
})
export class WebsiteModule { }
