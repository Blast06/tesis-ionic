

import { ArticlesProvider } from './../../providers/article.service';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
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

  singleArticle:any[]=[];




  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public articleService:ArticlesProvider,
              public modalCtrl:ModalController,) {

                
                articleService.getArticles().subscribe((data)=>{
                  this.articles = data;
                  console.log(this.articles);

                });
  }

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainListPage');
  }

  like(article){
    article.activeLike = !article.activeLike;
  }
// shareModal
  presentshareModal() {
    let shareModal = this.modalCtrl.create('ShareModal', { userId: 8675309 });
    shareModal.present();
  }

  // irArticuloPage(){
  //   this.navCtrl.push(ArticuloPage);
  // }

  goToSingleArticle(slug){
    this.articleService.getSingleArticle(slug).subscribe((data) =>{
      console.log(data);
      this.singleArticle = data;
      
    } );

    this.navCtrl.push(this.articuloPage, this.singleArticle);

  }

  



}
