import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MensajesPage } from './mensajes';

@NgModule({
  declarations: [
    MensajesPage,
  ],
  imports: [
    IonicPageModule.forChild(MensajesPage),
  ],
})
export class MensajesPageModule {}
