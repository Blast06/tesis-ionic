import { UsuarioProvider } from './usuario.service';

import { LoadingController } from 'ionic-angular';
import { URL_ARTICULOS, URL_SHOW_SINGLE_ARTICLE, URL_ARTICLE_FAVORITE, URL_SHOW_ARTICLES_WEBSITE_SUBSCRIBED, URL_CREATE_ARTICLE, URL_ARTICLE_UNFAVORITE, URL_ARTICLE_ISFAVORITED, URL_SEND_ARTICLE_IMAGE } from './../URLs/url.servicios';

import { Http } from '@angular/http';
import { Storage } from "@ionic/storage";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import "rxjs/Rx";
import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions, Response } from '@angular/http';


import { Platform } from 'ionic-angular'






@Injectable()
export class ArticlesProvider {

  headers = new Headers();

  private options;

  // public token: string;
  public token;


  articulos: any[] = [];



  constructor(public http: Http,
    private http2: HttpClient,
    public loadingCtrl: LoadingController,
    public platform: Platform,
    public storage: Storage,
    public usuarioService: UsuarioProvider) {

    // this.token;

    // sacar token del storage
    this.cargar_storage();

    //console.log(this.token);


    //config de headers para la peticion
    // this.headers.append("Accept", "Application/json");
    // this.headers.append("Content-Type", "application/x-www-form-urlencoded");
    this.headers.append("Accept", "Application/json");
    this.headers.append("Authorization", "Bearer " + this.token);
    this.options = new RequestOptions({ headers: this.headers });
  }


  getArticles() {

    return this.http.get(URL_ARTICULOS).map((response: Response) => response.json())
      .catch(error => Observable.throw("Error en article service"));
  }

  getSingleArticle(slug) {
    return this.http.get(URL_SHOW_SINGLE_ARTICLE + slug).map((response: Response) => response.json());

  }

  getSingleArticleRelateds(slug) {
    return this.http.get(URL_SHOW_SINGLE_ARTICLE + slug).map((response: Response) => response.toString());

  }

  getArticlesFromSubscribed() {
    return this.http.get(URL_SHOW_ARTICLES_WEBSITE_SUBSCRIBED, this.options).map((response: Response) => response.json());
    //
  }

  addToFavorite(slug) {
    console.log(this.token);
    return this.http.get(URL_ARTICLE_FAVORITE + slug + "/favorite", this.options).map((response: Response) => response.json());
  }

  removeToFavorite(slug) {
    return this.http.get(URL_ARTICLE_UNFAVORITE + slug + "/unfavorite", this.options).map((response: Response) => response.json());
  }

  isFavorite(slug) {
    return this.http.get(URL_ARTICLE_ISFAVORITED + slug + "/isFavoritedTo", this.options).map((response: Response) => response.json());
  }

  createArticle(name, description, price, status, stock, subcategory, websiteslug) {
    let body2 = {
      name: name,
      description: description,
      price: price,
      status: status,
      stock: stock,
      sub_category_id: subcategory

    }

    console.log(this.token);

    return this.http2.post(URL_CREATE_ARTICLE + websiteslug + "/articles", body2, {
      headers:
        { 'Accept': 'Application/json', 'Authorization': 'Bearer ' + this.token }
    });
  }

  sendArticleImg(website, img) {

    return this.http2.post(URL_SEND_ARTICLE_IMAGE + website + "/image", img, {
      headers:
        { 'Accept': 'Application/json', 'Authorization': 'Bearer ' + this.token }
    });

  }






  cargar_storage() {
    let promesa = new Promise((resolve, reject) => {
      if (this.platform.is("cordova")) {
        this.storage.get('token').then(val => {
          if (val) {
            this.token = val
            this.headers.delete("Accept");
            this.headers.delete("Authorization");
            this.headers.append("Accept", "Application/json");
            this.headers.append("Authorization", "Bearer " + this.token);
            this.options = new RequestOptions({ headers: this.headers });
            console.log('ok', this.options);
            resolve(true);

          } else {
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
