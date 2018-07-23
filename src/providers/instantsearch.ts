import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InstantSearchInstance } from 'angular-instantsearch/instantsearch/instantsearch';
// import * as instantsearch from 'instantsearch.js';
// import instantsearch from 'instantsearch.js/es';


@Injectable()
export class InstantsearchProvider {



  constructor(public http: HttpClient) {
    console.log('Hello InstantsearchProvider Provider');
  }

}
