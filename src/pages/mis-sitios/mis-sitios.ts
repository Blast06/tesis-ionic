import { Platform } from 'ionic-angular';
import { WebsiteProvider } from './../../providers/website.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { CrearSitiosPage } from "../index.paginas";
import { Storage } from "@ionic/storage";


/**
 * Generated class for the MisSitiosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mis-sitios',
  templateUrl: 'mis-sitios.html',
})
export class MisSitiosPage {

  Page = CrearSitiosPage;

  articulos: any[] =[];
  webSitesCollection: any[] = [];

  username:string


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public website:WebsiteProvider,
              public modalCtrl:ModalController,
              public storage:Storage,
              public platform:Platform,
              ) {

                //aqui tengo que enviar el username del sitio, pero primero tengo que coger el id del sitio que se ha 
                //clickeado, nota: con el navparams para mandar desde perfil.ts la posicion clickeada del sitio, y asi obtener
                //el username del sitio para despues mandarlo por aqui
                // website.mostrar_sitio_articles().subscribe((data:any) =>{


                // });

                
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad MisSitiosPage');
  }

  irCrear(){
    this.navCtrl.push(this.Page);
  }

  // active like fun
  like(item){
    item.activeLike = !item.activeLike;
  }
// shareModal
  presentshareModal() {
    let shareModal = this.modalCtrl.create('ShareModal', { userId: 8675309 });
    shareModal.present();
  }

  getData(){
    if (this.platform.is("cordova")) {
    this.storage.get('websites').then((data) => {
      console.log("myd data", JSON.parse(data));
      this.webSitesCollection = data;
  });
  
  }else{
    this.webSitesCollection = JSON.parse(localStorage.getItem('websites'));

    }

  }

}
