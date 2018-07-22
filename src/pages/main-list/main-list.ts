

import { ArticlesProvider } from './../../providers/article.service';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { Nav, Platform, Events } from 'ionic-angular';
import { ArticuloPage } from "../index.paginas";


@IonicPage()
@Component({
  selector: 'page-main-list',
  templateUrl: 'main-list.html',
})
export class MainListPage {


  articuloPage = ArticuloPage;
  

  articles:any[]=[];
  relatedArticles:any[]=[];

  singleArticle:any[]=[];
  slug:any;

  id:any;

   url = 'http://178.128.183.171';




  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public articleService:ArticlesProvider,
              public modalCtrl:ModalController,
              public loadingCtrl:LoadingController) {

                
                articleService.getArticles().subscribe((data)=>{
                  this.articles = data;
                  console.log(this.articles);
                  console.log("ARTICULOS");
                  

                });
  }

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainListPage');
  }

  like(article){
    article.activeLike = !article.activeLike;
    console.log(article.id);
    if(article.activeLike){
      this.articleService.addToFavorite(article.id).subscribe((data) =>{
        console.log(data);
        
      });
    }else{
      this.articleService.removeToFavorite(article.id).subscribe((data) =>{
        console.log(data);
        
      });

    }
  }
// shareModal
  presentshareModal() {
    let shareModal = this.modalCtrl.create('ShareModal', { userId: 8675309 });
    shareModal.present();
  }



  goToSingleArticle(slug){
    this.slug = slug;
    console.log(slug);
    console.log(this.slug);
    
    this.navCtrl.push(this.articuloPage, {slug:this.slug});


  }


}