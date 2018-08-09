import { ArticuloPage } from './../articulo/articulo';
import { HomePage } from './../home/home';
import { CarritoProvider } from "../../providers/index.services";
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-carrito',
  templateUrl: 'carrito.html',
})
export class CarritoPage {

  cart_articles: any[] = [];

  totalPrice: number = 0;
  total: number = 0;

  homepage = HomePage;

  show: boolean = false;
  iva: number = 0;
  toOrder: any;
  // orders:any[];

  orders: any = [];
  slug:any;
  articuloPage = ArticuloPage;







  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public carritoService: CarritoProvider,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController, ) {

    carritoService.getCart().subscribe((data: any) => {
      console.log("DATOS EN EL CONSTRUCTOR");
      console.log(data);

      this.cart_articles = data.data.cart_article;
      console.log(this.cart_articles);
      console.log(this.cart_articles.length);
      carritoService.carritoBadgeCounter = this.cart_articles.length;



      if (this.cart_articles.length) {
        this.orders = [];
        this.cart_articles.forEach((article) => {
          this.orders.push({

            "article_id": article.id,
            "quantity": article.pivot.quantity,
          });
        });
      }


      this.calculateSubTotal();

    });




  }

  ngOnInit() {
    this.calculateSubTotal();

  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad CarritoPage');
  }
  remove(id, idx) {
    this.carritoService.removeFromCart(id).subscribe((data: any) => {
      console.log(data);
    });
    this.removeFromArticlesArray(idx);
    this.presentAlert();
    this.carritoService.carritoBadgeCounter--;
    this.calculateSubTotal();


  }



  removeFromArticlesArray(idx: number) {
    this.cart_articles.splice(idx, 1);


  }


  calculateSubTotal() {
    if (this.cart_articles) {
      this.totalPrice = this.cart_articles.reduce((totalPrice, article) => totalPrice += parseFloat(article.price), 0);
      this.total = this.totalPrice + (this.totalPrice * 0.18);
      this.iva = this.totalPrice * 0.18;
    }

    this.toOrder = JSON.stringify(this.cart_articles);

  }

  addToCart(id, cantidad) {
    this.carritoService.addToCart(id, cantidad).subscribe((data: any) => {
      console.log(data);
    });

  }

  makeOrder() {

    this.carritoService.makeOrder(this.orders).subscribe((data) => {
      console.log(data);
    });
    let alert = this.alertCtrl.create({
      title: 'Orden realizada',
      subTitle: 'Has realizado tu orden',
      buttons: ['OK']
    });
    alert.present();
    alert.onDidDismiss(() => console.log('Alerta cerrada'));
    this.carritoService.carritoBadgeCounter = 0;
    this.navCtrl.pop();
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Articulo eliminado',
      subTitle: 'Has eliminado este articulo del carrito',
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


}
