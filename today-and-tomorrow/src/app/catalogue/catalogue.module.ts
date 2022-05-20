import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodayPageComponent } from './today-page/today-page.component';
import { CatalogueRoutingModule } from './catalogue-routing.module';
import { OneWeekComponent } from './one-week/one-week.component';
import { OneMonthComponent } from './one-month/one-month.component';
import { OneYearComponent } from './one-year/one-year.component';
import { ThreeYearsLaterComponent } from './three-years-later/three-years-later.component';
import { RouterModule } from '@angular/router';
import { CatalogueComponent } from './catalogue.component';
import { FormsModule } from '@angular/forms';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import {DragDropModule} from '@angular/cdk/drag-drop';



@NgModule({
  declarations: [
    TodayPageComponent,
    OneWeekComponent,
    OneMonthComponent,
    OneYearComponent,
    ThreeYearsLaterComponent,
    CatalogueComponent
  ],
  imports: [
    DragDropModule,
    RouterModule,
    CommonModule,
    FormsModule,
    CatalogueRoutingModule,
    MdbCheckboxModule,
  ]
})
export class CatalogueModule { }
