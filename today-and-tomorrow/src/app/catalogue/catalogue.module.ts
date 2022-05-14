import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodayPageComponent } from './today-page/today-page.component';
import { CatalogueRoutingModule } from './catalogue-routing.module';
import { OneWeekComponent } from './one-week/one-week.component';
import { OneMonthComponent } from './one-month/one-month.component';
import { OneYearComponent } from './one-year/one-year.component';
import { ThreeYearsLaterComponent } from './three-years-later/three-years-later.component';



@NgModule({
  declarations: [
    TodayPageComponent,
    OneWeekComponent,
    OneMonthComponent,
    OneYearComponent,
    ThreeYearsLaterComponent
  ],
  imports: [
    CommonModule,
    CatalogueRoutingModule
  ]
})
export class CatalogueModule { }
