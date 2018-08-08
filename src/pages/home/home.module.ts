import { HomePage } from './home';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Ionic2RatingModule } from "ionic2-rating";

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    Ionic2RatingModule, // Put ionic2-rating module here
    IonicPageModule.forChild(HomePage),
  ],
})
export class HomePageModule {}
