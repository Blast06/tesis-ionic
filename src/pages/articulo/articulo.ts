
import { CarritoProvider } from './../../providers/carrito.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, AlertController } from 'ionic-angular';
import { ArticlesProvider } from '../../providers/index.services';
import { Article } from '../../app/models/article';


@IonicPage()
@Component({
  selector: 'page-articulo',
  templateUrl: 'articulo.html',
})
export class ArticuloPage {

  articuloPage = ArticuloPage;

  article: Article[] = [];

  activated: boolean = false;
  slug: any;
  public relatedArticles: any[] = [];
  relatedArticles2 = []
  cantidad: number = 1;
  evilResponseProps;
  reviews = [];

  rate: number = 0;






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
      
    });

    // console.log(this.relatedArticles2);

    articleService.getSingleArticleRelateds(this.slug).subscribe((data) => {
      console.log(data);
    });
  }

  

  ngOnInit() {
    this.reviews.forEach((review) => {
      this.rate += review.rating;
    });
  }



  goToSingleArticle(slug) {
    this.slug = slug;
    console.log(slug);
    console.log(this.slug);

    this.navCtrl.push(this.articuloPage, { slug: this.slug });
  }

  // getRelatedArtsArray() {
  //   let evilResponse;
  //   this.evilResponseProps = this.relatedArticles.keys();

  //   for (const prop of this.evilResponseProps) {
  //     this.relatedArticles2.push(this.evilResponseProps[prop]);

  //   }


  // }

  increment() {
    if (this.cantidad == this.article.stock ) {

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


    }
    this.carritoService.addToCart(id, cantidad).subscribe((data: any) => {
      console.log(data);
      this.presentAlert();
    });
  }





  presentCartModal() {
    this.carritoService.ver_carrito();
  }

  presentAlert3() {
    let alert = this.alertCtrl.create({
      title: 'Articulo agregado',
      subTitle: 'Has agregado este articulo a favoritos',
      buttons: ['OK']
    });
    alert.present();
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
      this.presentAlert3();


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
