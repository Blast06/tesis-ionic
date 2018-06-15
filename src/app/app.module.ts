import { HTTP } from '@ionic-native/http';


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
import { CarritoProvider,ArticlesProvider,UsuarioProvider} from "../providers/index.services";

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

 } from "../pages/index.paginas";




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
  ],
  imports: [ 
    MbscModule, 
    FormsModule, 
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicStorageModule.forRoot(),
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
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsuarioProvider,
    IonicStorageModule,
    ArticlesProvider,
    CarritoProvider,
    HTTP

  ]
})
export class AppModule {}
