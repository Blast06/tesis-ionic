import { Headers, RequestOptions, Response } from '@angular/http';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from "@ionic/storage";
import { Platform } from 'ionic-angular'
import { URL_SHOW_ARTICLES_WEBSITE_SUBSCRIBED, URL_SHOW_WEBSITE } from '../URLs/url.servicios';
import { UsuarioProvider } from './usuario.service';



@Injectable()
export class WebsiteProvider {

  headers = new Headers();
  private options;

  public token: string;



  constructor(public http: HttpClient,
    public http2: Http,
    public _userService: UsuarioProvider,
    public storage: Storage,
    public platform:Platform,) {


    //sacar token del storage
    this.getToken();


    //config de headers para la peticion
    this.headers.append("Accept", "Application/json");
    this.headers.append("Authorization", "Bearer " + this.token);
    this.options = new RequestOptions({ headers: this.headers });

  }


  mostrar_sitio_articles(username) { 
    return this.http2.get(URL_SHOW_WEBSITE + username, this.options).map((response: Response) => response.json());
  }

  mostrar_articulos_sitios_suscritos() {
    this.getToken();
    return this.http2.get(URL_SHOW_ARTICLES_WEBSITE_SUBSCRIBED, this.options).map((response: Response) => response.json());

  }

  getToken() {
    if (this.platform.is("cordova")) {
      this.storage.get('token').then((t) => {
        this.token = t;
      })

    }
    else {
      this.token = localStorage.getItem("token");
    }

  }


}
