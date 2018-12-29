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

  articulos: any[] = [];
  webSitesCollection: any[] = [];

  website: any = [];

  username: string

  slug: any;
  articuloPage = ArticuloPage

  articles: any[] = [];

  mostrarBtn: boolean;



  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public storage: Storage,
    public platform: Platform,
    public usuarioService: UsuarioProvider,
    public websiteService: WebsiteProvider,
    public alertCtrl: AlertController,
  ) {





    this.username = navParams.get('username');

    websiteService.mostrar_info_sitio(this.username).subscribe((data:any) => {
      console.log(data);
      console.log(this.username);
      this.website = data.data;
      console.log(this.website);
      console.log(this.website.username);
      this.articles = data.data.articles;
      console.log(this.articles);
      // this.isSubscribed();
    });


    


  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad MisSitiosPage');
  }

  ionViewWillEnter(){
    console.log("ionViewWillEnter");
    this.isSubscribed();
  }

  irCrear() {
    this.navCtrl.push(this.Page);
  }


  subscribeTowebsite(website) {
    if (website) {
      this.websiteService.subscribeToWebsite(website).subscribe((data:any) => {
        console.log(data);
        // console.log(data.data.message);
        console.log(data.message);
        this.mostrarBtn = true;
      })

    }
  }
  unSubscribeTowebsite(website) {
    if (website) {
      this.websiteService.unSubscribeToWebsite(website).subscribe((data:any) => {
        console.log(data);
        // console.log(data.data.message);
        console.log(data.message);
        this.mostrarBtn = false;
      });

    }
  }
  isSubscribed() {
    if (this.username) {
      this.websiteService.isSubscribedTo(this.username).subscribe((data: any) => {
        if (data == true) {
          this.mostrarBtn = true;

        }else{
          this.mostrarBtn = false;
        }
        console.log(data);
        console.log(this.username);
        console.log(this.username.toString());
      });


    }

  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'HECHO',
      subTitle: 'Te acabas de suscribir',
      buttons: ['OK']
    });
    alert.present();
  }

  goToSingleArticle(slug) {
    this.slug = slug;
    console.log(slug);
    console.log(this.slug);

    this.navCtrl.push(this.articuloPage, { slug: this.slug });


  }

  // active like fun
  like(item) {
    item.activeLike = !item.activeLike;
  }
  // shareModal
  presentshareModal() {
    let shareModal = this.modalCtrl.create('ShareModal', { userId: 8675309 });
    shareModal.present();
  }

  getData() {
    if (this.platform.is("cordova")) {
      this.storage.get('websites').then((data) => {
        console.log("myd data", JSON.parse(data));
        this.webSitesCollection = data;
      });

    } else {
      this.webSitesCollection = JSON.parse(localStorage.getItem('websites'));

    }

  }


}
