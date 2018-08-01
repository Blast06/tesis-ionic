import { CarritoProvider } from './../../providers/carrito.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, AlertController } from 'ionic-angular';
import { ArticlesProvider } from '../../providers/index.services';





@IonicPage()
@Component({
  selector: 'page-articulo',
  templateUrl: 'articulo.html',
})
export class ArticuloPage {

  articuloPage = ArticuloPage;

  article: any[] = [];
  activated: boolean = false;
  slug: any;
  relatedArticles: any[] = [];
  cantidad: number = 0;




  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public carritoService: CarritoProvider,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public articleService: ArticlesProvider,
    public alertCtrl:AlertController
  ) {

    this.slug = navParams.get('slug');
    console.log("en articulo.ts");
    console.log(this.slug);

    articleService.getSingleArticle(this.slug).subscribe((data) => {
      this.article = data.data.article;
      console.log(this.article);
      console.log(data.data);
      this.relatedArticles = data.data.relateds;
      console.log(this.relatedArticles);
    });





  }



  goToSingleArticle(slug) {
    this.slug = slug;
    console.log(slug);
    console.log(this.slug);

    this.navCtrl.push(this.articuloPage, { slug: this.slug });


  }

  increment() {
    // if (this.cantidad == this.article.stock) {

    // } else {
    //   this.cantidad++;

    // }
  }

  decrement() {
    if (this.cantidad < 2) {

    } else {
      this.cantidad--;
    }
  }

  addToCart(id, cantidad) {
    this.carritoService.addToCart(id, cantidad).subscribe((data: any) => {
      console.log(data);
      this.presentAlert();
    });
  }





  presentCartModal() {
    let modal = this.modalCtrl.create('Cart');
    modal.present();
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Articulo agregado',
      subTitle: 'Has agregado este articulo al carrito',
      buttons: ['OK']
    });
    alert.present();
  }


}
