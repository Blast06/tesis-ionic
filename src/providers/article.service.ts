import { LoadingController } from 'ionic-angular';
import { URL_ARTICULOS, URL_SHOW_SINGLE_ARTICLE } from './../URLs/url.servicios';
import { Article } from './../app/models/article';
import { Http } from '@angular/http';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import "rxjs/Rx";
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import { tap } from 'rxjs/operators';
import { HTTP } from '@ionic-native/http';




@Injectable()
export class ArticlesProvider {


  articulos: any[] = [];


  
  constructor(public http: Http, 
              private http2: HttpClient,
              private http3: HTTP,
              public loadingCtrl:LoadingController,) {
    console.log('Hello ArticlesProvider Provider');
  }


  getArticles(){
    
    return this.http.get(URL_ARTICULOS).map((response: Response) => response.json())
    .catch(error => Observable.throw("Error en article service"));
  }

  getSingleArticle(slug){
    return this.http.get(URL_SHOW_SINGLE_ARTICLE + slug).map((response:Response) => response.json());

  }
  

}
