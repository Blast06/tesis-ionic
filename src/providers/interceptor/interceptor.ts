import { UsuarioProvider } from './../usuario.service';
import { AlertController } from 'ionic-angular';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest } from '@angular/common/http';
import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import { _throw } from "rxjs/observable/throw";
import { catchError } from "rxjs/operators";

/*
  Clase para setear los headers en cada peticion.
  more info about interceptos here: https://www.youtube.com/watch?v=vHoNOpfDdNQ
  LOS INTERCEPTORS SOLO FUNCIONAN CON HTTPCLIENT
*/
@Injectable()
export class InterceptorProvider implements HttpInterceptor{

  token:string;

  constructor(public storage:Storage, public platform: Platform,public alertCtrl:AlertController, public _us:UsuarioProvider) {
    console.log("TOKEN EN INTERCEPTOR");
    this.token = localStorage.getItem("token");
    console.log(this.token);
    
  }

  intercept(request:HttpRequest<any>, next:HttpHandler): Observable<HttpEvent<any>> {

    let cloneReq = this.addToken(request,this.token);
        return next.handle(cloneReq).pipe(catchError(error => {
            let msg = error.message;
  
            let alert = this.alertCtrl.create({
              title: error.name,
              message: msg,
              buttons: ['OK']
  
            });
            alert.present();
  
            //pass the error to the caller of the function
            return _throw(error);
        }));

  }

  private addToken(request: HttpRequest<any>, token:any){
    if (token) {
      let clone: HttpRequest<any>;
      clone = request.clone({
        setHeaders: {
          Accept: 'Application/json',
          Authorization: `Bearer ${token}`

        }
      });
      return clone;
    }
    return request;
  }


}