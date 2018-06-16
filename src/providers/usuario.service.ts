import { URL_SIGNUP, URL_LOGIN } from './../URLs/url.servicios';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';



import { Injectable } from "@angular/core";
import { Http, URLSearchParams, HttpModule, Response, Headers } from "@angular/http";
import 'rxjs/add/operator/map';

import { Storage } from "@ionic/storage";
// import { IonicStorageModule } from '@ionic/storage';

import { AlertController, Platform } from "ionic-angular";
import { FormGroup } from '@angular/forms';


const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Access-Control-Allow-Origin': '*'
};


// const httpOptions = {
//     headers: new HttpHeaders({
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
//         'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
//         'Access-Control-Allow-Credentials': true,
//     })
// };

@Injectable()
export class UsuarioProvider {

    token: string;
    id_usuario: string;
    // headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

   



    // headers = new Headers();

    signupForm: FormGroup;

    constructor(private http: Http,
        private alertCtrl: AlertController,
        private platform: Platform,
        private storage: Storage,
        private http2: HttpClient) {
            this.cargar_storage();



    }

    token_activo(): boolean {
        if (this.token) {
            return true

        } else {
            return false;
        }

    }


    ingresar(email: string, password: string) {

        let body = {
            email: email,
            password: password
        };

       

        // return this.http2.post(url, body, {headers:headers});

        return this.http.post(URL_LOGIN, body).map(data_resp => {

            console.log("DATOS A ENVIAR(DENTRO DEL USUARIO SERVICE): ");
            //convertir el body en json() 
            let body2 = data_resp.json() || {};
            console.log(body2);


            if (data_resp["error"]) {
                this.alertCtrl.create({
                    title: 'Error al iniciar',
                    subTitle: data_resp["Message"],
                    buttons: ["OK"]
                }).present();
            } else {
                this.token = body2.token2;
                this.id_usuario = body2.user;
                
                //guardar storage
                this.guardar_storage();
            }
        });
    }

    ingresar2(email:string, password:string){

        let data = new URLSearchParams();
        data.append("email",email);
        data.append("password",password);

        return this.http.post(URL_LOGIN,data)
                        .map( resp => {
                            let data_resp = resp.json();
                            console.log(data_resp);
                            


                        })
        

    }

    cerrar_sesion() {
        this.token = null;
        this.id_usuario = null;

        //guardar storage
        this.guardar_storage();
    }

    private guardar_storage() {


        if (this.platform.is("cordova")) {
            //dispositivo
            this.storage.set('token', this.token);
            this.storage.set('id_usuario', this.id_usuario);
        } else {
            //computadora
            if (this.token) {

                localStorage.setItem('token', this.token);
                localStorage.setItem('id_usuario', this.id_usuario);

            } else {
                localStorage.removeItem("token");
                localStorage.removeItem("id_usuario");

            }

        }

    }


    cargar_storage() {

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

                        this.storage.get("id_usuario")
                            .then(id_usuario => {
                                if (id_usuario) {
                                    this.id_usuario = id_usuario;
                                }
                                resolve();
                            })

                    })


            } else {
                // computadora
                if (localStorage.getItem("token")) {
                    //Existe items en el localstorage
                    this.token = localStorage.getItem("token");
                    this.id_usuario = localStorage.getItem("id_usuario");

                }

                resolve();

            }

        });

        return promesa;

    }


    registrar(name: string, email: string, password: string, password_confirmation: string) {
        let form = {
            name: name,
            email: email,
            password: password,
            password_confirmation: password_confirmation

        };

        return this.http.post( URL_SIGNUP, form).subscribe(
            data => console.log(data),
            error => console.log(error)
        )


    }



}