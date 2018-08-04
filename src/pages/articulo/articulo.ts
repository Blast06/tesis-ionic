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
  relatedArticles2 = []
  cantidad: number = 1;
  evilResponseProps;




  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public carritoService: CarritoProvider,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public articleService: ArticlesProvider,
    public alertCtrl: AlertController
  ) {

    this.slug = navParams.get('slug');

    console.log("en articulo.ts");
    console.log(this.slug);

  

    articleService.getSingleArticle(this.slug).subscribe((data) => {
      this.article = data.data.article;
      console.log(data);
      console.log(this.article);
      console.log(data.data);
      this.relatedArticles = data.data.relateds;
      console.log(this.relatedArticles);
    });
    this.getRelatedArtsArray();
    console.log(this.relatedArticles2);

    articleService.getSingleArticleRelateds(this.slug).subscribe((data) => {
      console.log(data);
    });
  }



  goToSingleArticle(slug) {
    this.slug = slug;
    console.log(slug);
    console.log(this.slug);

    this.navCtrl.push(this.articuloPage, { slug: this.slug });
  }

  getRelatedArtsArray() {
    let evilResponse;
    this.evilResponseProps = this.relatedArticles.keys();

    for (const prop of this.evilResponseProps) {
      this.relatedArticles2.push(this.evilResponseProps[prop]);

    }


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
    if (cantidad < 1) {
      this.presentAlert2();


    }
    this.carritoService.addToCart(id, cantidad).subscribe((data: any) => {
      console.log(data);
      this.presentAlert();
    });
  }





  presentCartModal() {
    this.carritoService.ver_carrito();
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Articulo agregado',
      subTitle: 'Has agregado este articulo al carrito',
      buttons: ['OK']
    });
    alert.present();
  }

  addToFavorite(id) {

    this.articleService.addToFavorite(id).subscribe((data) => {
      console.log(data);

    });
  }

  presentAlert2() {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'Debes especificar una cantidad!',
      buttons: ['OK']
    });
    alert.present();
  }


}
