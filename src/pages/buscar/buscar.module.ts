import { SuperTabsModule } from 'ionic2-super-tabs';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuscarPage } from './buscar';
import { NgAisInstantSearch, NgAisModule } from '../../../node_modules/angular-instantsearch';
import { Ionic2RatingModule } from "ionic2-rating";


@NgModule({
  declarations: [
    BuscarPage,
    NgAisModule,
    NgAisInstantSearch,
    SuperTabsModule,
  ],
  imports: [
    Ionic2RatingModule, // Put ionic2-rating module here
    IonicPageModule.forChild(BuscarPage),
    NgAisModule
  ],
})
export class BuscarPageModule {}
