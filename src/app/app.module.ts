import { Camera } from '@ionic-native/camera';
import { MainListPage } from './../pages/main-list/main-list';
import { Network } from '@ionic-native/network';

import { HTTP } from '@ionic-native/http';
import { NgAisModule, NgAisInstantSearch } from 'angular-instantsearch';
import { Ionic2RatingModule } from 'ionic2-rating';
import { StarRatingModule, StarRatingConfigService } from 'angular-star-rating';



import { HttpModule } from '@angular/http';
import { MbscModule } from '@mobiscroll/angular';
import { FormsModule } from '@angular/forms';



import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from "@angular/common/http";


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SuperTabsModule } from 'ionic2-super-tabs';

// storage
import { IonicStorageModule } from '@ionic/storage';



//servicios
import { CarritoProvider,ArticlesProvider,UsuarioProvider,WebsiteProvider} from "../providers/index.services";

//paginas
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { BuscarSitiosPage } from './../pages/buscar-sitios/buscar-sitios';
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
    BuscarSitiosPage
    
    
  ],
  imports: [ 
    MbscModule, 
    FormsModule, 
    BrowserModule,
    HttpClientModule,
    HttpModule,
    StarRatingModule.forRoot(),
    IonicStorageModule.forRoot(),
    Ionic2RatingModule,
    SuperTabsModule.forRoot(),
    NgAisModule.forRoot(),
    IonicModule.forRoot(MyApp,{
      scrollPadding:false,
      scrollAssist:true,
      autoFocusAssits:false
    }),
    
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
    BuscarSitiosPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsuarioProvider,
    ArticlesProvider,
    CarritoProvider,
    InstantsearchProvider,
    NetworkProvider,
    Network,
    WebsiteProvider,
    NgAisInstantSearch,
    StarRatingConfigService,
    Camera,
    HTTP,

  ]
})
export class AppModule {}