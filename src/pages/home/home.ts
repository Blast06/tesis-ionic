import { MyApp } from './../../app/app.component';

import { ArticuloPage } from './../index.paginas';

//servicios
import { UsuarioProvider,ArticlesProvider,CarritoProvider } from './../../providers/index.services';

import { Observable } from 'rxjs/Observable';
import { Article } from './../../app/models/article';

import { Component, Input, OnInit } from '@angular/core';
import { NavController, Events } from 'ionic-angular';

//algolia
import { NgAisModule } from 'angular-instantsearch';


import {connectSearchBox} from 'instantsearch.js/es/connectors';
import instantsearch from 'instantsearch.js/dist-es5-module/src/lib/main';

import {searchBox} from 'instantsearch.js/es/widgets';




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage  implements OnInit{


 



  articuloPage = ArticuloPage;


  articles: Observable<Article[]>;

  
  
  constructor(public navCtrl: NavController,
    public _us:UsuarioProvider, 
    public _articleService:ArticlesProvider, 
    public carritoService:CarritoProvider,
    public events:Events,
    ) {
      
    }
    
    
    ngOnInit(){


      //para cambiar las opciones del menu lateral

      this.actualizar_menu();



      

      
      
      this.articles = this._articleService.getArticles();
      console.log("cantidad de items:")
      console.log(this.carritoService.items.length)
      console.log(this._articleService.getArticles())
      
      
    }
    
    siguiente_pagina(infiniteScroll){
      
      this._articleService.getArticles();
      
      
    }

    actualizar_menu(){
      this.events.publish('user:menu');
    }
    
    
    
  }
  