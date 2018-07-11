import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InstantSearchInstance } from 'angular-instantsearch/instantsearch/instantsearch';
// import * as instantsearch from 'instantsearch.js';
// import instantsearch from 'instantsearch.js/es';


/*
  Generated class for the ProvidersInstantsearchProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InstantsearchProvider {



  constructor(public http: HttpClient) {
    console.log('Hello InstantsearchProvider Provider');
  }

}
