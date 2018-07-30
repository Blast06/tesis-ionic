import { CarritoProvider } from './../../providers/carrito.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Loading, LoadingController } from 'ionic-angular';
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
  cantidad: number;




  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public carritoService: CarritoProvider,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public articleService: ArticlesProvider, ) {

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

  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
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

  decrement(){
    // if (this.cantidad == 1 ) {
      
    // }else{
    //   this.cantidad--;
    // }
  }





  presentCartModal() {
    let modal = this.modalCtrl.create('Cart');
    modal.present();
  }











}
