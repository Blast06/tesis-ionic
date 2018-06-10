import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PedidosDetallePage } from './pedidos-detalle';

@NgModule({
  declarations: [
    PedidosDetallePage,
  ],
  imports: [
    IonicPageModule.forChild(PedidosDetallePage),
  ],
})
export class PedidosDetallePageModule {}
