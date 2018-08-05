import { NgAisInstantSearch, NgAisModule } from '../../../node_modules/angular-instantsearch';

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuscarSitiosPage } from './buscar-sitios';

@NgModule({
  declarations: [
    BuscarSitiosPage,
    NgAisModule,
    NgAisInstantSearch,
  ],
  imports: [
    IonicPageModule.forChild(BuscarSitiosPage),
    NgAisModule
  ],
})
export class BuscarSitiosPageModule { }
