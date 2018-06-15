
import { ArticuloPage } from './../index.paginas';

//servicios
import { UsuarioProvider,ArticlesProvider,CarritoProvider } from './../../providers/index.services';

import { Observable } from 'rxjs/Observable';
import { Article } from './../../app/models/article';

import { Component, Input, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage  implements OnInit{



  articuloPage = ArticuloPage;


  articles: Observable<Article[]>;


  constructor(public navCtrl: NavController,
              public _us:UsuarioProvider, public _articleService:ArticlesProvider, public carritoService:CarritoProvider) {

  }

  ngOnInit(){

    this.articles = this._articleService.getArticles();
    console.log("cantidad de items:")
    console.log(this.carritoService.items.length)
  

  }

  siguiente_pagina(infiniteScroll){

    this._articleService.getArticles()


  }

}
