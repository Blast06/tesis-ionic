import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, Slides, Platform } from 'ionic-angular';
import { NgAisModule } from 'angular-instantsearch';



@IonicPage()
@Component({
  selector: 'page-buscar',
  templateUrl: 'buscar.html',

})
export class BuscarPage {

  @ViewChild('slider') slider: Slides;
  page = "0"




  pet: string = "puppies";
  isAndroid: boolean = false;


  algoliaConfig = {
    apiKey: '0751b52d360e98c2d482aefc3afcf3fb',
    appId: 'E5A908GO9E',
    indexName: 'articles',
    routing: true
  }



  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform) {
    this.isAndroid = platform.is('android');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuscarPage');
  }

  ngAfterViewInit() {

  }


  selectedTab(ind) {
    this.slider.slideTo(ind);
  }


  moveButton($event) {
    this.page = $event._snapIndex.toString();
  }



}