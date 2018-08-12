import { UsuarioProvider } from './usuario.service';

import { LoadingController } from 'ionic-angular';
import { URL_ARTICULOS, URL_SHOW_SINGLE_ARTICLE, URL_ARTICLE_FAVORITE, URL_SHOW_ARTICLES_WEBSITE_SUBSCRIBED, URL_CREATE_ARTICLE, URL_ARTICLE_UNFAVORITE, URL_ARTICLE_ISFAVORITED } from './../URLs/url.servicios';

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
    this.getToken();

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

  createArticle(name,description,price,status,stock,subcategory, websiteslug) {
    let body2 = {
      name: name,
      description: description,
      price:price,
      status:status,
      stock:stock,
      sub_category_id:subcategory

    }
    this.getToken();
    console.log(this.token);

    // return this.http2.post(URL_CREATE_ARTICLE + websiteslug + "/articles", body2, this.options);

    return this.http2.post(URL_CREATE_ARTICLE + websiteslug + "/articles" ,body2, {headers:
       {'Accept':'Application/json', 'Authorization': 'Bearer ' + this.token} });
  }






  getToken() {
    let promesa = new Promise((resolve, reject) => {

      if (this.platform.is("cordova")) {
        // dispositivo
        this.storage.ready()
          .then(() => {

            this.storage.get("token")
              .then(token => {
                if (token) {
                  this.token = token;
                }
              })

          })


      } else {
        // computadora
        if (localStorage.getItem("token")) {
          //Existe items en el localstorage
          this.token = localStorage.getItem("token");


        }

        resolve();

      }

    });

    return promesa;

  }


}
