import { LoadingController } from 'ionic-angular';
import { URL_ARTICULOS, URL_SHOW_SINGLE_ARTICLE, URL_ARTICLE_FAVORITE, URL_SHOW_ARTICLES_WEBSITE_SUBSCRIBED, URL_CREATE_ARTICLE } from './../URLs/url.servicios';
import { Article } from './../app/models/article';
import { Http } from '@angular/http';
import { Storage } from "@ionic/storage";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import "rxjs/Rx";
import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions, Response } from '@angular/http';
import { tap } from 'rxjs/operators';
import { HTTP } from '@ionic-native/http';
import { Platform } from 'ionic-angular'





@Injectable()
export class ArticlesProvider {

  headers = new Headers();

  private options;

  public token: string;

  articulos: any[] = [];



  constructor(public http: Http,
    private http2: HttpClient,
    private http3: HTTP,
    public loadingCtrl: LoadingController,
    public platform:Platform,
    public storage: Storage, ) {

    // sacar token del storage
    this.getToken();


    //config de headers para la peticion
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

  getArticlesFromSubscribed(){
    return this.http.get(URL_SHOW_ARTICLES_WEBSITE_SUBSCRIBED,this.options).map((response:Response) =>response.json());
    
  }

  addToFavorite(id) {
    console.log(this.token);
    return this.http.get(URL_ARTICLE_FAVORITE + id + "/favorite", this.options).map((response:Response) =>response.json());
  }

  removeToFavorite(id) {
    return this.http.get(URL_ARTICLE_FAVORITE + id + "/unfavorite", this.options).map((response:Response) =>response.json());
  }

  createArticle(parameters,websiteslug){
    let body2 = parameters;
    console.log(this.token);
    return this.http.post(URL_CREATE_ARTICLE + websiteslug + "/articles",body2,this.options).map((response:Response) => response.json());

  }

 getCart(){
   
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
