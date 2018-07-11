import { URL_WEBSITE } from './../URLs/url.servicios';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class WebsiteProvider {



  constructor(public http: HttpClient,
    public http2: Http) {


    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('cache-control', 'no-cache, private');

  }



  crearWebsite(name: string, username: string) {


    let body = {
      name: name,
      username: username
    };

   let  body2 = body || {};

    console.log("DATOS A ENVIAR DENTRO DE WEBSITESERVICE1:" + body2);



    return this.http2.post(URL_WEBSITE, body).map(data_resp => {
      console.log("DATOS A ENVIAR DENTRO DE WEBSITESERVICE2:" + body2);

      let body3 = data_resp.json() || {};

      console.log("RESPUESTA: " + data_resp);

    });

  }


}
