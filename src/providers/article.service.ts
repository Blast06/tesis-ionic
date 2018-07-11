import { URL_ARTICULOS } from './../URLs/url.servicios';
import { Article } from './../app/models/article';
import { Http } from '@angular/http';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import "rxjs/Rx";
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import { tap } from 'rxjs/operators';
import { HTTP } from '@ionic-native/http';



/*
  Generated class for the ArticlesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

// const headers = {
//   'Content-Type': 'application/json',
//   'Access-Control-Allow-Headers': 'Content-Type',
//   'Access-Control-Allow-Methods': 'GET',
//   'Access-Control-Allow-Origin': '*'
// };


@Injectable()
export class ArticlesProvider {


  articulos: any[] = [];


  
  constructor(public http: Http, 
              private http2: HttpClient,
              private http3: HTTP) {
    console.log('Hello ArticlesProvider Provider');
  }


  getArticles(): Observable<Article[]> {
    



    // let promesa = new Promise( (resolve, reject) => {



    // } );

    //ESTO ES CON HTTP1
    return this.http.get(URL_ARTICULOS).map((response: Response) => response.json().data);

    // return this.http3.get(URL_ARTICULOS).then( data => {

    // })







    //ESTA ES CON EL NUEVO HTTPCLIENT
    // return this.http.get<Article[]>(URL_ARTICULOS)
    // .pipe(
    //   tap(heroes => this.log(`fetched users`)),
    // )



  }

}
