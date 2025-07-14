import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UniSportHomeComponent } from './university-sports/uni-sport-home/uni-sport-home.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';

const routes: Routes = [
  { path: '', component: UniSportHomeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes), SlickCarouselModule],
  exports: [RouterModule]
})
export class CommercialWebsiteRoutingModule { }
