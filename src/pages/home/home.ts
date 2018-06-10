import { ArticuloPage } from './../index.paginas';

import { ArticlesProvider } from './../../providers/article.service';
import { UsuarioProvider } from './../../providers/index.services';

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
  // articles:any[]= [];

  articles: Observable<Article[]>;


  constructor(public navCtrl: NavController,
              public _us:UsuarioProvider, public _articleService:ArticlesProvider) {

  }

  ngOnInit(){

    this.articles = this._articleService.getArticles();

  }

  siguiente_pagina(infiniteScroll){

    this._articleService.getArticles()


  }

}
