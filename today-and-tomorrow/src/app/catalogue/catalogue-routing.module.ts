import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogueComponent } from './catalogue.component';
import { OneMonthComponent } from './one-month/one-month.component';
import { OneWeekComponent } from './one-week/one-week.component';
import { OneYearComponent } from './one-year/one-year.component';
import { ThreeYearsLaterComponent } from './three-years-later/three-years-later.component';
import { TodayPageComponent } from './today-page/today-page.component';

const routes: Routes = [
   {
     path: '',
     component: CatalogueComponent,
   },
   {
     path: '0',
     component: TodayPageComponent,
   },
   {
    path: '1',
    component: OneWeekComponent,
  },
  {
    path: '2',
    component: OneMonthComponent,
  },
  {
    path: '3',
    component: OneYearComponent,
  },
  {
    path: '4',
    component: ThreeYearsLaterComponent,
  }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class CatalogueRoutingModule { }