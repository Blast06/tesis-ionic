import { ArticuloPage } from './../articulo/articulo';
import { Platform } from 'ionic-angular';

import { Component, ViewChild, Renderer, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, Content, ModalController } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/index.services';
import { User } from '../../app/models/user';
import { Observable } from 'rxjs/Observable';
import { MisSitiosPage } from '../mis-sitios/mis-sitios';
import { Storage } from "@ionic/storage";




@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {


  @ViewChild('pageSlider') pageSlider: Slides;
  @ViewChild('mySlider') slider: Slides;
  @ViewChild(Content) content: Content;

  slides: any;
  tabs: any = '0';

  searching: any = false;

  header: any;
  headerHeight: any;
  translateAmt: any;
  darkHeader: any;

  user:any[];

  websites: any[] = [];
  favorites: any[] = [];

  page = MisSitiosPage;

  username: any;

  articuloPage = ArticuloPage;

  slug: any

  hideFavoriteBtn: boolean = false;



  constructor(public navCtrl: NavController,
    public renderer: Renderer,
    public zone: NgZone,
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public _us: UsuarioProvider,
    public platform: Platform,
    public storage: Storage) {
    console.log('perfil');
    this.getFavorites();
    this.getUserInfo();




  }

  ionViewWillEnter() {
    console.log("ionViewWillEnter");
    this.getFavorites();
    this.getUserInfo();

  }

  getUserInfo() {
    this._us.mostrar_usuario()
      .map(res => res.json())
      .subscribe((data:any) => {
        // let data2: any = JSON.stringify(data.data);
        // this.user = JSON.parse(data2);
        // console.log("USUARIOUSUARIO----------- USUARIO", JSON.parse(data.data));
        // console.log("SITIOS --------- SITIOS", JSON.parse(data.data.websites));
        // this.websites = this.user.websites;

        console.log("ESTO ES LO QUE HAY EN DATA MOSTRAR USUARIO EN PERFILTS")
        console.log("CONSOLE SOLO CON DATA: ",data);
        this.user = data.data;
        console.log("CONSOLE IMPRIMIENDO EL DATA.DATA.WEBSITES: ",data.data.websites);
        this.websites = data.data.websites;

        console.log("CONSOLE IMPRIMIENDO EL DATA PERO EN JSONSTRINGFY: ",JSON.stringify(data));
        console.log("CONSOLE IMPRIMIENDO EL USER PERO EN JSONSTRINGFY: ",JSON.stringify(this.user));
        // console.log("CONSOLE IMPRIMIENDO EL DATA.DATA  EN JSONPARSE: ",JSON.parse(data.data));
      }
        , err => {
          console.log(JSON.stringify(err));
        }
      );

  }



  goTowebsite(username) {
    this.username = username
    this.navCtrl.push(this.page, { username: this.username });
  }

  getFavorites() {
    this._us.getFavorites().subscribe((data: any) => {
      // console.log("FAVORITOS ----------FAVORITOS", JSON.stringify(data.data.favorite_article));
      // let data2: any = JSON.stringify(data.data.favorite_article);
      // this.favorites = JSON.parse(data2);
      // console.log("EST ES EL FAVORITES CON JSON PARSE DEL DATA2", this.favorites);
      // console.log("EST ES EL DATA2  SOLO CON JSONSTRINFY", data2);
      // console.log("EST ES EL DATA2  CON JSONPARSE", JSON.parse(data2));
      // this.favorites = JSON.parse(data.data.favorite_article);
      this.favorites = data.data.favorite_article;
    });

  }

  goToSingleArticle(slug) {
    this.slug = slug;
    console.log(slug);
    console.log(this.slug);

    this.navCtrl.push(this.articuloPage, { slug: this.slug, hideFavoriteBtn: this.hideFavoriteBtn });
  }



  scrollingFun(ev) {
    ev.domWrite(() => {
      this.updateHeader(ev);
      //
    });
  }

  updateHeader(ev) {
    if (ev.scrollTop >= 0) {
      this.translateAmt = -ev.scrollTop / 2;
      if (this.translateAmt < -210) {
        this.translateAmt = -210;
      }
    }
    if (ev.scrollTop >= 250) {
      this.renderer.setElementClass(this.header, 'userInfo', true);
    } else this.renderer.setElementClass(this.header, 'userInfo', false);


    this.zone.run(() => {
      this.renderer.setElementStyle(this.header, 'webkitTransform', 'translate3d(0,' + this.translateAmt + 'px,0)');
    });
  }



  ngAfterViewInit() {
    var length = document.getElementsByClassName("myHeader").length - 1;
    this.header = document.getElementsByClassName("myHeader")[length];
    // var lengthToolbar=document.getElementsByClassName("toolbar-background-md").length -1;
    // this.headerHeight = this.header.clientHeight;


  }

  selectTab(index) {
    this.pageSlider.slideTo(index);
    this.content.scrollToTop();
  }
  // for changeWillSlide
  changeWillSlide($event) {
    this.tabs = $event._snapIndex.toString();
    setTimeout(() => {
      this.content.scrollToTop();
    }, 200)
  }

  presentCartModal() {
    let modal = this.modalCtrl.create('Cart');
    modal.present();
  }


}