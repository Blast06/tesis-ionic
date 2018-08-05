import { SuperTabsModule } from 'ionic2-super-tabs';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuscarPage } from './buscar';
import { NgAisInstantSearch, NgAisModule } from '../../../node_modules/angular-instantsearch';


@NgModule({
  declarations: [
    BuscarPage,
    NgAisModule,
    NgAisInstantSearch,
    SuperTabsModule

  ],
  imports: [
    IonicPageModule.forChild(BuscarPage),
    NgAisModule
  ],
})
export class BuscarPageModule {}
