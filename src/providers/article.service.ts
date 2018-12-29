import { UsuarioProvider } from './usuario.service';

import { LoadingController } from 'ionic-angular';
import { URL_ARTICULOS, URL_SHOW_SINGLE_ARTICLE, URL_ARTICLE_FAVORITE, URL_SHOW_ARTICLES_WEBSITE_SUBSCRIBED, URL_CREATE_ARTICLE, URL_ARTICLE_UNFAVORITE, URL_ARTICLE_ISFAVORITED, URL_SEND_ARTICLE_IMAGE } from './../URLs/url.servicios';

import { Http } from '@angular/http';
import { Storage } from "@ionic/storage";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import "rxjs/Rx";
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import { Platform } from 'ionic-angular'





@Injectable()
export class ArticlesProvider {


  private options;
  public token;
  articulos: any[] = [];



  constructor(public http: Http,
    private http2: HttpClient,
    public loadingCtrl: LoadingController,
    public platform: Platform,
    public storage: Storage,
    public usuarioService: UsuarioProvider) {

       


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
    return this.http2.get(URL_SHOW_ARTICLES_WEBSITE_SUBSCRIBED);
    //
  }

  addToFavorite(slug) {
    console.log(this.token);
    return this.http2.get(URL_ARTICLE_FAVORITE + slug + "/favorite");
  }

  removeToFavorite(slug) {
    return this.http2.get(URL_ARTICLE_UNFAVORITE + slug + "/unfavorite");
  }

  isFavorite(slug) {
    return this.http2.get(URL_ARTICLE_ISFAVORITED + slug + "/isFavoritedTo");
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

    return this.http2.post(URL_CREATE_ARTICLE + websiteslug + "/articles", body2);
  }

  sendArticleImg(website, img) {

    return this.http2.post(URL_SEND_ARTICLE_IMAGE + website + "articles/images", img);

  }



}
