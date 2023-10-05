import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

import { CustomPreloadService } from './services/custom-preload.service';

import { QuicklinkStrategy } from 'ngx-quicklink';
import { adminGuard } from './guards/admin.guard';

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./website/website.module").then(m => m.WebsiteModule),
    data: {
      preload: true
    }
  },
  {
    path: "cms",
    canActivate: [ adminGuard ],
    loadChildren: () => import("./cms/cms.module").then(m => m.CmsModule)
  },
  {
    path: "**",
    component: NotFoundComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {
      // preloadingStrategy: PreloadAllModules //Carga todos los modulos
      //preloadingStrategy: CustomPreloadService  //Solo carga los que yo configure
      preloadingStrategy: QuicklinkStrategy
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
