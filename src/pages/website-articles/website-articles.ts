import { WebsiteProvider } from './../../providers/website.service';
import { ArticuloPage } from './../articulo/articulo';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-website-articles',
  templateUrl: 'website-articles.html',
})
export class WebsiteArticlesPage {

  articuloPage = ArticuloPage;
  slug: any;

  username:any;
  websiteArticles:any[]=[];


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public websiteService:WebsiteProvider, ) {

    this.username = navParams.get('username');

    websiteService.mostrar_info_sitio(this.username).subscribe((data:any) => {
      console.log(data);
      this.websiteArticles = data.data;
      console.log(this.websiteArticles);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WebsiteArticlesPage');
  }

  presentshareModal() {
    let shareModal = this.modalCtrl.create('ShareModal', { userId: 8675309 });
    shareModal.present();
  }

  goToSingleArticle(slug) {
    this.slug = slug;
    console.log(slug);
    console.log(this.slug);

    this.navCtrl.push(this.articuloPage, { slug: this.slug });
  }

}
