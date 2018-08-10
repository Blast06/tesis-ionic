import { PedidosPage } from './../pages/pedidos/pedidos';
import { BuscarSitiosPage } from './../pages/buscar-sitios/buscar-sitios';

import { ToastController } from 'ionic-angular';
import { Network } from '@ionic-native/network';

import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {  TabsPage, LoginPage, PerfilPage, CreararticuloPage, CrearSitiosPage } from "../pages/index.paginas";
import { NetworkProvider, UsuarioProvider } from "../providers/index.services";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = TabsPage;

  pages: Array<{ title: string, component: any }>;

  network: Network;

  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public us: UsuarioProvider,
    public events: Events,
    public networkProvider: NetworkProvider,
    public checkNetwork: Network,
    public toastCtrl: ToastController,
    public usuarioService:UsuarioProvider) {



    this.initializeApp();

    // funcion para cambiar las opciones a mostrar
    this.actualizar_menu();

    //para poder usarla en otros components
    events.subscribe('user:menu', () => {
      this.actualizar_menu();
    });


    this.isConnected();
    //evento para chequear conexion a internet
    events.subscribe('network:conexion', () => {
      this.isConnected();
    });

  }

  /**
   * presentToast
   */
  public presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Telefono no conectado a internet, por favor, revisa tu conexion',
      duration: 3000,
      position: 'bottom',
      showCloseButton: true,
      closeButtonText: 'Ok'

    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  /**
   * Funcion Para chequear conexion a interente en toda la app
   */
  public isConnected(): void {
    this.checkNetwork.onDisconnect()
      .subscribe(() => {
        this.presentToast();
      });

  }



  initializeApp() {

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.networkProvider.initializeNetworkEvents();
      this.isConnected();
      this.usuarioService.cargar_storage();
      


    });
  }


  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component);
  }

  actualizar_menu() {
    if (this.us.token) {
      this.pages = [
        { title: 'Mi perfil', component: PerfilPage },
        { title: 'Crear Sitio', component: CrearSitiosPage },
        { title: 'Crear Articulo', component: CreararticuloPage },
        { title: 'Buscar Sitios', component: BuscarSitiosPage },
        { title: 'Ordenes', component: PedidosPage },

      ];

    } else {
      this.pages = [
        { title: 'Iniciar sesion', component: LoginPage }

      ];
    }

  }

}
