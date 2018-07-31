import { CarritoProvider } from "../../providers/index.services";
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-carrito',
  templateUrl: 'carrito.html',
})
export class CarritoPage {

  cart_articles: any[] = [];
 


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public carritoService: CarritoProvider,
    public viewCtrl: ViewController, ) {

    carritoService.getCart().subscribe((data: any) => {
      console.log("DATOS EN EL CONSTRUCTOR");
      console.log(data);
      this.cart_articles = data.data.cart_article;
      console.log(this.cart_articles);
      console.log(this.cart_articles.length);
      
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarritoPage');
  }
  remove(id,idx) {
    this.carritoService.removeFromCart(id).subscribe((data: any) => {
      console.log(data);
    });
    this.removeFromArticlesArray(idx);
    
  }

  removeFromArticlesArray(idx:number){
    this.cart_articles.splice(idx,1);

  }
}
