import { Injectable } from '@angular/core';
import { ArticuloPage } from './../articulo/articulo';
import { ArticlesProvider } from './../../providers/article.service';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, Slides, Platform } from 'ionic-angular';
import { NgAisModule } from 'angular-instantsearch';
import { SuperTabs } from '../../../node_modules/ionic2-super-tabs';


@IonicPage()
@Component({
  selector: 'page-buscar',
  templateUrl: 'buscar.html',

})
export class BuscarPage {

  @ViewChild('slider') slider: Slides;

  public page = "1";


  slug:any;


  isAndroid: boolean = false;
  articuloPage = ArticuloPage;


  algoliaConfig = {
    apiKey: '0751b52d360e98c2d482aefc3afcf3fb',
    appId: 'E5A908GO9E',
    indexName: 'articles',
    routing: true
  }



  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public articleService: ArticlesProvider, ) {


    this.isAndroid = platform.is('android');


  }

  ionViewWillEnter(){
    console.log("ionviewwillenter");
    
  }

  ngAfterViewInit() {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuscarPage');
  }




  goToSingleArticle(slug:string) {
    this.slug = slug.replace(/\s+/g, '-'); //para sustituir por - en los espacios del slug
    console.log(slug);
    console.log(this.slug);

    this.navCtrl.push(this.articuloPage, { slug: this.slug });


  }



}