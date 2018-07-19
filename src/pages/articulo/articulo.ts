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

  article: any[] = [];
  activated:boolean = false;
  slug:any;
  relatedArticles:any[]=[];



  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public carritoService: CarritoProvider,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public articleService:ArticlesProvider, ) {

    this.slug = navParams.get('slug');
    console.log("en articulo.ts");
    console.log(this.slug);

    articleService.getSingleArticle(this.slug).subscribe((data) =>{
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





  presentCartModal() {
    let modal = this.modalCtrl.create('Cart');
    modal.present();
  }











}
