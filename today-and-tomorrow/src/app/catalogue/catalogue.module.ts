import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodayPageComponent } from './today-page/today-page.component';
import { CatalogueRoutingModule } from './catalogue-routing.module';



@NgModule({
  declarations: [
    TodayPageComponent
  ],
  imports: [
    CommonModule,
    CatalogueRoutingModule
  ]
})
export class CatalogueModule { }
