
import { ArticuloPage } from './../index.paginas';

//servicios
import { UsuarioProvider,ArticlesProvider,CarritoProvider, WebsiteProvider } from './../../providers/index.services';

import { Observable } from 'rxjs/Observable';
import { Article } from './../../app/models/article';

import { Component, Input, OnInit } from '@angular/core';
import { NavController, Events } from 'ionic-angular';






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
    public websiteService:WebsiteProvider
    ) {
      
    }
    
    
    ngOnInit(){


      //para cambiar las opciones del menu lateral
      this.actualizar_menu();
      // this.websiteService.mostrar_articulos_sitios_suscritos().subscribe((data:any) =>{
      //   console.log(data);
      // });


    }
    
    siguiente_pagina(infiniteScroll){
      
     
      
      
    }

    actualizar_menu(){
      this.events.publish('user:menu');
    }
    
    
    
  }
  