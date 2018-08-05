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

  ngAfterViewInit() {
    // setTimeout(() => {
    //   if (this.slider) {
    //     this.slider.update();
    //   }
    // }, 300);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuscarPage');
  }

  // selectTab(ind) {
  //   this.slider.slideTo(ind);
  // }










}