
import { CarritoProvider } from './../../providers/carrito.service';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, AlertController, Slides } from 'ionic-angular';
import { ArticlesProvider } from '../../providers/index.services';




@IonicPage()
@Component({
  selector: 'page-articulo',
  templateUrl: 'articulo.html',
})
export class ArticuloPage {

  @ViewChild(Slides) slides: Slides;

  articuloPage = ArticuloPage;

  article: any = [];




  activated: boolean = false;
  slug: any;
  public relatedArticles: any[] = [];
  relatedArticles2 = []
  cantidad: number = 1;
  evilResponseProps;
  reviews = [];

  rate: number = 0;
  mostrarfavorite: boolean;
  mostrarcart: boolean;







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




    articleService.getSingleArticle(this.slug).subscribe((data: any) => {
      this.article = data.data.article;
      console.log(data);
      console.log(this.article);
      console.log(this.article.id);
      console.log(data.data);
      console.log(data.data.relateds);
      console.log(data.data.reviews);
      this.reviews = data.data.reviews;
      this.relatedArticles = data.data.relateds;
      console.log(this.relatedArticles);
      console.log(this.reviews);


      this.reviews.forEach((review) => {
        this.rate += review.rating;
      });
      console.log(this.rate);
      this.rate = this.rate / this.reviews.length;
      console.log(this.rate);
      this.mostrarfavorite = true;
      this.mostrarcart = true;
      this.isFavorite();


    });
    articleService.getSingleArticleRelateds(this.slug).subscribe((data) => {
      console.log(data);
    });
  }


  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    console.log('Current index is', currentIndex);
  }

  ionViewWillEnter() {
    this.reviews.forEach((review) => {
      this.rate += review.rating;
    });

  }
  ngOnInit() {

  }



  goToSingleArticle(slug) {
    this.slug = slug;
    console.log(slug);
    console.log(this.slug);

    this.navCtrl.push(this.articuloPage, { slug: this.slug });
  }



  increment() {
    if (this.cantidad == this.article.stock) {

    } else {
      this.cantidad++;


    }
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
      this.mostrarcart = false;


    }
    this.carritoService.addToCart(id, cantidad).subscribe((data: any) => {
      console.log(data);
      this.presentAlert();
    });
  }
  removeToCart(id, cantidad) {
    if (cantidad < 1) {
      this.presentAlert2();
      this.mostrarcart = false;


    }
    this.carritoService.removeFromCart(id).subscribe((data: any) => {
      console.log(data);
      this.presentAlert();
    });
  }





  presentCartModal() {
    this.carritoService.ver_carrito();
  }

  presentAlert3(msg1, msg2) {
    let alert = this.alertCtrl.create({
      title: msg1,
      subTitle: msg2,
      buttons: ['OK']
    });
    alert.present();
  }

  isFavorite() {
    this.articleService.isFavorite(this.article.id).subscribe((data: any) => {
      console.log(this.article.name);
      console.log(data);
    })
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
      this.mostrarfavorite = false;
      this.presentAlert3('Articulo agregado', 'Has agregado este articulo a favoritos');


    });
  }
  removeFromFavorite(id) {

    this.articleService.removeToFavorite(id).subscribe((data) => {
      console.log(data);
      this.mostrarfavorite = true;
      this.presentAlert3('Articulo eliminado', 'Has eliminado este articulo de favoritos');


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
