import { AlertController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { WebsiteProvider } from './../../providers/website.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { CrearSitiosPage } from "../index.paginas";
import { Storage } from "@ionic/storage";
import { ArticuloPage } from '../articulo/articulo';
import { UsuarioProvider } from '../../providers/index.services';




@IonicPage()
@Component({
  selector: 'page-mis-sitios',
  templateUrl: 'mis-sitios.html',
})
export class MisSitiosPage {

  Page = CrearSitiosPage;

  articulos: any[] =[];
  webSitesCollection: any[] = [];

  website:any[]=[];

  username:string

  slug:any;
  articuloPage = ArticuloPage

  articles:any[] =[];
 


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public modalCtrl:ModalController,
              public storage:Storage,
              public platform:Platform,
              public usuarioService:UsuarioProvider,
              public websiteService:WebsiteProvider,
              public alertCtrl:AlertController,
              ) {

                

                this.username = navParams.get('username');

                websiteService.mostrar_info_sitio(this.username).subscribe((data) => {
                  console.log(data);
                  this.website = data.data;
                  console.log(this.website);
                  this.articles = data.data.articles;
                  console.log(this.articles);
                });

                
                

                
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad MisSitiosPage');
  }

  irCrear(){
    this.navCtrl.push(this.Page);
  }

  subscriteTowebsite(website){
    this.websiteService.subscribeToWebsite(website).subscribe((data) =>{
      console.log(data);
    })

    

  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'HECHO',
      subTitle: 'Te acabas de suscribir',
      buttons: ['OK']
    });
    alert.present();
  }

  goToSingleArticle(slug){
    this.slug = slug;
    console.log(slug);
    console.log(this.slug);
    
    this.navCtrl.push(this.articuloPage, {slug:this.slug});


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
