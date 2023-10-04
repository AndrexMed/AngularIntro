import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmsRoutingModule } from './cms-routing.module';
import { TaskComponent } from './pages/task/task.component';
import { LayoutComponent } from './components/layout/layout.component';
import { GridComponent } from './components/grid/grid.component';


@NgModule({
  declarations: [
    TaskComponent,
    LayoutComponent,
    GridComponent
  ],
  imports: [
    CommonModule,
    CmsRoutingModule
  ]
})
export class CmsModule { }
