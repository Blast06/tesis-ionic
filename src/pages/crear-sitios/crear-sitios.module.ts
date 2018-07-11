import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CrearSitiosPage } from './crear-sitios';

@NgModule({
  declarations: [
    CrearSitiosPage,
  ],
  imports: [
    IonicPageModule.forChild(CrearSitiosPage),
  ],
})
export class CrearSitiosPageModule {}
