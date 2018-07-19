
import { ArticuloPage } from './../index.paginas';

//servicios
import { UsuarioProvider, ArticlesProvider, CarritoProvider, WebsiteProvider } from './../../providers/index.services';

import { Observable } from 'rxjs/Observable';
import { Article } from './../../app/models/article';

import { Component, Input, OnInit, Renderer, ViewChild, NgZone } from '@angular/core';
import { NavController, Events, Content } from 'ionic-angular';








@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  headerbg: any;
  darkHeader: any;

  
  // articles: Observable<Article[]>;

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController,
    public _us: UsuarioProvider,
    public _articleService: ArticlesProvider,
    public carritoService: CarritoProvider,
    public events: Events,
    public websiteService: WebsiteProvider,
    public renderer: Renderer,
    public zone: NgZone,
  ) {

  }

  ngAfterViewInit() {
    var length = document.getElementsByClassName("header_home").length - 1;
    this.headerbg = document.getElementsByClassName("header_home")[length];
  }


  ngOnInit() {


    //para cambiar las opciones del menu lateral
    this.actualizar_menu();
    // this.websiteService.mostrar_articulos_sitios_suscritos().subscribe((data:any) =>{
    //   console.log(data);
    // });


  }

  siguiente_pagina(infiniteScroll) {

  }

  actualizar_menu() {
    this.events.publish('user:menu');
  }

  scrollingFun(ev) {
    ev.domWrite(() => {
      this.updateHeader(ev);
    });
  }

  updateHeader(ev) {
    if (ev.scrollTop > 0) {
      this.darkHeader = ev.scrollTop / 200;
      this.renderer.setElementClass(this.headerbg, 'sub-header', true);
    } else this.renderer.setElementClass(this.headerbg, 'sub-header', false);
  }

  

  



}
