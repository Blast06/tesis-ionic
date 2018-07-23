
import { MainListPage } from './../pages/main-list/main-list';
import { Network } from '@ionic-native/network';

import { HTTP } from '@ionic-native/http';
import { NgAisModule } from 'angular-instantsearch';


import { HttpModule } from '@angular/http';
import { MbscModule } from '@mobiscroll/angular';
import { FormsModule } from '@angular/forms';



import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from "@angular/common/http";
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// storage
import { IonicStorageModule } from '@ionic/storage';

//servicios
import { CarritoProvider,ArticlesProvider,UsuarioProvider,WebsiteProvider} from "../providers/index.services";

//paginas
import { 
 
    ArticuloPage,
    CategoriasPage,
    RegistroPage,
    PorCategoriaPage,
    PedidosPage,
    PedidosDetallePage,
    CarritoPage,
    LoginPage,
    TabsPage,
    PerfilPage,
    MensajesPage,
    MisSitiosPage,
    ConfiguracionPage,
    CrearSitiosPage,
    CreararticuloPage,
    BuscarPage

 } from "../pages/index.paginas";
import { InstantsearchProvider } from '../providers/instantsearch';
import { NetworkProvider } from '../providers/network/network';
import { PipesNullfieldsPipe } from '../pipes/pipes-nullfields/pipes-nullfields';

 
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ArticuloPage,
    CategoriasPage,
    RegistroPage,
    PorCategoriaPage,
    PedidosPage,
    PedidosDetallePage,
    CarritoPage,
    LoginPage,
    TabsPage,
    PerfilPage,
    MensajesPage,
    MisSitiosPage,
    ConfiguracionPage,
    CrearSitiosPage,
    MainListPage,
    BuscarPage,
    PipesNullfieldsPipe,
    CreararticuloPage,
    
    
  ],
  imports: [ 
    MbscModule, 
    FormsModule, 
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    NgAisModule.forRoot(),
    IonicModule.forRoot(MyApp),
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ArticuloPage,
    CategoriasPage,
    RegistroPage,
    PorCategoriaPage,
    PedidosPage,
    PedidosDetallePage,
    CarritoPage,
    LoginPage,
    TabsPage,
    PerfilPage,
    MensajesPage,
    MisSitiosPage,
    ConfiguracionPage,
    CrearSitiosPage,
    MainListPage,
    BuscarPage,
    CreararticuloPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsuarioProvider,
    ArticlesProvider,
    CarritoProvider,
    HTTP,
    InstantsearchProvider,
    NetworkProvider,
    Network,
    WebsiteProvider,
    IonicStorageModule,

  ]
})
export class AppModule {}
