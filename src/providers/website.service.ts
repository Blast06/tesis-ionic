import { Headers } from '@angular/http';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from "@ionic/storage";
import { Platform } from 'ionic-angular'
import {  } from '../URLs/url.servicios';
import { UsuarioProvider } from './usuario.service';

//API ENDPOINTS
import { URL_CREATE_WEBSITE, URL_WEBSITE_SUSCRIBE, URL_WEBSITE_UNSUSCRIBE, URL_WEBSITE_IS_SUSCRIBED,URL_SHOW_ARTICLES_WEBSITE_SUBSCRIBED, URL_SHOW_WEBSITE } from './../URLs/url.servicios';



export interface Res {
  headers: any,
  ok: boolean,
  status: number,
  statusText: string,
  url: string,
  _body: string

}

@Injectable()
export class WebsiteProvider {

  headers = new Headers();
  private options:any;

  public token: string;


  constructor(public http: HttpClient,
    public http2: Http,
    public _userService: UsuarioProvider,
    public storage: Storage,
    public platform: Platform, ) {


  }


  mostrar_info_sitio(username) {
    return this.http.get(URL_SHOW_WEBSITE + username);
    // .map((response: Response) => response.json())
  }

  getArticlesFromSubscribed() {
    return this.http.get(URL_SHOW_ARTICLES_WEBSITE_SUBSCRIBED);

  }


  crear_sitio(name: string, username: string) {

    let body = {
      name: name,
      username: username,

    }

    return this.http.post(URL_CREATE_WEBSITE, body);

  }

  subscribeToWebsite(slug) {
    return this.http.get(URL_WEBSITE_SUSCRIBE + slug + "/subscribe");
  }

  unSubscribeToWebsite(slug) {
    return this.http.get(URL_WEBSITE_UNSUSCRIBE + slug + "/unsubscribe");
  }
  isSubscribedTo(slug) {
    return this.http.get(URL_WEBSITE_IS_SUSCRIBED + slug + "/isSubscribedTo");
  }


}
