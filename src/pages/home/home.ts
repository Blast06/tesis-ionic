import { BuscarSitiosPage } from './../buscar-sitios/buscar-sitios';

import { StarRatingModule } from 'angular-star-rating';
import { ArticuloPage, LoginPage, BuscarPage } from './../index.paginas';

//servicios
import { UsuarioProvider, ArticlesProvider, CarritoProvider, WebsiteProvider } from './../../providers/index.services';


import { Component, OnInit, Renderer, ViewChild, NgZone } from '@angular/core';
import { NavController, Events, Content } from 'ionic-angular';
import { CreararticuloPage } from '../creararticulo/creararticulo';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  rate: number = 0;

  headerbg: any;
  darkHeader: any;

  articlesFromSubscribed: any[] = [];

  detector: boolean;
  slug: any;
  articuloPage = ArticuloPage;
  cartItemsCounter: number = 0;

  token = this._us.token;
  show: boolean = false;

  buscarSitios = BuscarSitiosPage;



  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController,
    public _us: UsuarioProvider,
    public _ws: WebsiteProvider,
    public articleService: ArticlesProvider,
    public carritoService: CarritoProvider,
    public events: Events,
    public websiteService: WebsiteProvider,
    public renderer: Renderer,
    public zone: NgZone, ) {



    if (this.token) {
      websiteService.getArticlesFromSubscribed().subscribe((data:any) => {
        console.log(data.data);
        this.articlesFromSubscribed = data.data;

        if (this.articlesFromSubscribed.length < 1) {
          this.articlesFromSubscribed = null;

        }

      });

      this.getTotalItemsCart();

    }
    this.changeDetector();
    console.log(this.articlesFromSubscribed);
    console.log(this.articlesFromSubscribed.length);

  }

  ngAfterViewInit() {
    var length = document.getElementsByClassName("header_home").length - 1;
    this.headerbg = document.getElementsByClassName("header_home")[length];
  }




  ionViewWillEnter() {
    // this._us.cargar_storage();
    // this._ws.cargar_storage();
    // this.carritoService.cargar_storage();
        
    console.log("ionViewWillEnter");
    this.token = this._us.token;

    console.log('token', this.token);

    if (this.token) {
      this.websiteService.getArticlesFromSubscribed().subscribe((data:any) => {
        console.log(data.data);
        this.articlesFromSubscribed = data.data;
      });


      this.carritoService.getCart().subscribe((data:any) => {
        this.carritoService.carritoBadgeCounter = data.data.cart_article.length;
        this.show = true;
      });
    }




  }
  // ngOnInit() {

  //   if (this.token) {
  //     this.websiteService.getArticlesFromSubscribed().subscribe((data) => {
  //       console.log(data.data);
  //       this.articlesFromSubscribed = data.data;

  //       if (this.articlesFromSubscribed.length < 1) {
  //         this.articlesFromSubscribed = null;

  //       } else {

  //         this.show = true;
  //       }

  //     });

  //     this.carritoService.getCart().subscribe((data) => {
  //       this.carritoService.carritoBadgeCounter = data.data.cart_article.length;

  //     });

    

  //   }

  //   para cambiar las opciones del menu lateral
  //   this.actualizar_menu();
  //   console.log(this.rate);
  // }

  siguiente_pagina(infiniteScroll) {

  }



  getTotalItemsCart() {
    this.carritoService.getCart().subscribe((data: any) => {
      console.log("DATOS EN EL CONSTRUCTOR");
      console.log(data);

      this.cartItemsCounter = data.data.cart_article.length;
      console.log(this.cartItemsCounter);

    });


  }

  changeDetector() {
    if (this.articlesFromSubscribed.length == 0 || this.articlesFromSubscribed == null) {
      this.detector = true;

    }
    else {
      this.detector = false;
    }
  }

  actualizar_menu() {
    this.events.publish('user:menu');
  }

  isConnected() {
    this.events.publish('network:conexion');
  }

  scrollingFun(ev) {
    ev.domWrite(() => {
      this.updateHeader(ev);
    });
  }

  goTo() {
    if (this.token) {
      this.navCtrl.push(CreararticuloPage);

    }
    else {
      this.navCtrl.push(LoginPage);
    }
  }
  goTo2() {
    this.navCtrl.push(BuscarPage);
  }

  goToSignIn() {
    this.navCtrl.push(LoginPage);

  }

  goToSingleArticle(slug) {
    this.slug = slug;
    console.log(slug);
    console.log(this.slug);

    this.navCtrl.push(this.articuloPage, { slug: this.slug });


  }

  like(article) {
    article.activeLike = !article.activeLike;
    console.log(article.id);
    if (article.activeLike) {
      this.articleService.addToFavorite(article.id).subscribe((data) => {
        console.log(data);

      });
    } else {
      this.articleService.removeToFavorite(article.id).subscribe((data) => {
        console.log(data);

      });

    }
  }

  cerrarSesion() {
    this._us.cerrar_sesion();
    this.articlesFromSubscribed = null;
    this.carritoService.carritoBadgeCounter = 0;
  }

  updateHeader(ev) {
    if (ev.scrollTop > 0) {
      this.darkHeader = ev.scrollTop / 200;
      this.renderer.setElementClass(this.headerbg, 'sub-header', true);
    } else this.renderer.setElementClass(this.headerbg, 'sub-header', false);
  }


}