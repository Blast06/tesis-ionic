import { URL_CREATE_WEBSITE, URL_WEBSITE_SUSCRIBE, URL_WEBSITE_UNSUSCRIBE, URL_WEBSITE_IS_SUSCRIBED } from './../URLs/url.servicios';
import { Headers, RequestOptions, Response } from '@angular/http';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from "@ionic/storage";
import { Platform } from 'ionic-angular'
import { URL_SHOW_ARTICLES_WEBSITE_SUBSCRIBED, URL_SHOW_WEBSITE } from '../URLs/url.servicios';
import { UsuarioProvider } from './usuario.service';
import { Observable } from '../../node_modules/rxjs';
import { tap } from 'rxjs/operators';


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
  private options;

  public token: string;



  constructor(public http: HttpClient,
    public http2: Http,
    public _userService: UsuarioProvider,
    public storage: Storage,
    public platform: Platform, ) {


    //sacar token del storage
    this.getToken();


    //config de headers para la peticion
    this.headers.append("Accept", "Application/json");
    //this.headers.append("Authorization", "Bearer " + this.token);
    this.options = new RequestOptions({ headers: this.headers });

  }


  mostrar_info_sitio(username) {
    return this.http2.get(URL_SHOW_WEBSITE + username, this.options).map((response: Response) => response.json());
  }

  getArticlesFromSubscribed() {

    console.log('options', this.options);

    return this.http2.get(URL_SHOW_ARTICLES_WEBSITE_SUBSCRIBED, this.options).map((response: Response) => response.json());

  }


  crear_sitio(name: string, username: string) {

    let body = {
      name: name,
      username: username,

    }

    return this.http2.post(URL_CREATE_WEBSITE, body, this.options);

  }

  subscribeToWebsite(slug){
    return this.http2.get(URL_WEBSITE_SUSCRIBE  + slug + "/subscribe",this.options).map((response:Response) => response.json());
  }

  unSubscribeToWebsite(slug){
    return this.http2.get(URL_WEBSITE_UNSUSCRIBE + slug + "/unsubscribe",this.options).map((response:Response) => response.json());
  }
  isSubscribedTo(slug){
    return this.http2.get(URL_WEBSITE_IS_SUSCRIBED + slug + "/isSubscribedTo",this.options).map((response:Response) => response.json());
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

  prueba_api() {
    return this.http2.get("https://jsonplaceholder.typicode.com/posts").map((response: Response) => response.json());

  }

  cargar_storage() {
    let promesa = new Promise((resolve, reject) => {
        if (this.platform.is("cordova")) {
            this.storage.get('token').then(val =>{
                if (val) {
                    this.token = val
                    this.headers.append("Accept", "Application/json");
                    this.headers.append("Authorization", "Bearer " + this.token);
                    this.options = new RequestOptions({ headers: this.headers });
                    console.log('ok', this.options);
                    resolve(true);
                    
                }else{
                    resolve(false);
                }
            });

            


        } else {
           if (localStorage.getItem("token")) {
            //Existe items en el localstorage
            this.token = localStorage.getItem("token");
            this.headers.append("Authorization", "Bearer " + this.token);
            this.options = new RequestOptions({ headers: this.headers });
            console.log('ok', this.options);
        }

            resolve();

        }

    });

    return promesa;

}

}
