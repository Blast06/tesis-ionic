import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArticuloPage } from './articulo';
import { Ionic2RatingModule } from "ionic2-rating";


@NgModule({
  declarations: [
    ArticuloPage,
  ],
  imports: [
    IonicPageModule.forChild(ArticuloPage),
    Ionic2RatingModule, // Put ionic2-rating module here
    IonicPageModule.forChild(ArticuloPage),
  ],
})
export class ArticuloPageModule { }