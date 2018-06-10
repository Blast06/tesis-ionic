import { URL_ARTICULOS } from './../URLs/url.servicios';
import { Article } from './../app/models/article';
import { Http } from '@angular/http';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import "rxjs/Rx";
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import { tap } from 'rxjs/operators';


/*
  Generated class for the ArticlesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ArticlesProvider {


  articulos:any[]=[];

  



 

  constructor(public http: Http) {
    console.log('Hello ArticlesProvider Provider');
  }


  getArticles(): Observable<Article[]> {


    // let promesa = new Promise( (resolve, reject) => {


      
    // } );
    
    //ESTO ES CON HTTP
    return this.http.get(URL_ARTICULOS).map((response: Response) => response.json());

    
    

    //ESTA ES CON EL NUEVO HTTPCLIENT
    // return this.http.get<Article[]>(URL_ARTICULOS)
    // .pipe(
    //   tap(heroes => this.log(`fetched users`)),
    // )
    
      
    
  }

}
