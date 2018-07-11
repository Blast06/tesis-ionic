import { Network } from '@ionic-native/network';

import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RegistroPage, HomePage, TabsPage, LoginPage, PerfilPage, ConfiguracionPage, MensajesPage, MisSitiosPage } from "../pages/index.paginas";
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
    public networkProvider: NetworkProvider, ) {
    this.initializeApp();

    // funcion para cambiar las opciones a mostrar
    this.actualizar_menu();

    //para poder usarla en otros components
    events.subscribe('user:menu', () => {
      this.actualizar_menu();
    });





  }

  initializeApp() {

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.networkProvider.initializeNetworkEvents();

      // Offline event
      this.events.subscribe('network:offline', () => {
        alert('network:offline ==> ' + this.network.type);
      });

      // Online event
      this.events.subscribe('network:online', () => {
        alert('network:online ==> ' + this.network.type);
      });

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
        { title: 'Configuracion', component: ConfiguracionPage },
        { title: 'Mis sitios', component: MisSitiosPage },
        { title: 'Mensajes', component: MensajesPage },

      ];

    } else {
      this.pages = [
        { title: 'Iniciar sesion', component: LoginPage },
        { title: 'Registro', component: RegistroPage },

      ];
    }

  }

}
