import { BuscarPage } from './../buscar/buscar';
import { Component } from '@angular/core';
import { HomePage,CategoriasPage,PedidosPage } from "../index.paginas";




@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1 = HomePage;
  tab2 = CategoriasPage;
  tab3 = PedidosPage;
  tab4 = BuscarPage;


}
