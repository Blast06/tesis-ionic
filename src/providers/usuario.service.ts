
import { HTTP } from '@ionic-native/http';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import 'rxjs/add/operator/catch';
import {  HttpClient,  HttpErrorResponse } from '@angular/common/http';


import { URL_SIGNUP, URL_LOGIN, URL_SHOW_USER, URL_SHOPPING_CART } from './../URLs/url.servicios';



import { Injectable } from "@angular/core";



import { Storage } from "@ionic/storage";
import { AlertController, Platform, ToastController, Events, LoadingController } from "ionic-angular";
import { FormGroup } from '@angular/forms';



interface APIErrorResponse extends HttpErrorResponse {
    error: {
        id?: string
        links?: { about: string }
        status: string
        code?: string
        title: string
        detail: string
        source?: {
            pointer?: string
            parameter?: string
        }
        meta?: any
    }
}



const CLIENT_ID = "2";

const SECRET_KEY = "HdcAKuH3XhxzvZxyNI6isj9z1NT0AGdu0of4ufKK";





@Injectable()
export class UsuarioProvider {

    public token: string;
    public id_usuario: string;
    user: any[] = [];
    headers = new Headers();
    headers2 = new Headers();

    private options;
    private options2;
    response: any;

    data: any;
    error: any;

    body3: APIErrorResponse;



    signupForm: FormGroup;

    constructor(private http: Http,
        private alertCtrl: AlertController,
        private platform: Platform,
        private storage: Storage,
        private http2: HttpClient,
        private toastCtrl: ToastController,
        public events: Events,
        public loadingCtrl: LoadingController,
        public http3: HTTP,) {
        this.cargar_storage();


        //para el login
        this.headers.append("Accept", "Application/json");
        this.headers.append("Content-Type", "Application/json");
        this.headers.append("Access-Control-Allow-Origin", "*");

        this.options = new RequestOptions({ headers: this.headers });

        //para las peticiones que necesitan user conectado
        this.headers2.append("Accept", "Application/json");
        this.headers2.append("Authorization", "Bearer " + this.token);
        this.options2 = new RequestOptions({ headers: this.headers2 });


    }

    token_activo(): boolean {
        if (this.token) {
            return true

        } else {
            return false;
        }

    }


    getFavorites() {
        return this.http.get(URL_SHOPPING_CART, this.options2).map((response: Response) => response.json());
    }


    ingresar(username: string, password: string) {

        let body = {
            username: username,
            password: password,
            client_secret: SECRET_KEY,
            client_id: CLIENT_ID,
            grant_type: "password"
        };


        return this.http2.post(URL_LOGIN, body, this.options);
        this.presentLoadingDefault('Ingresando..');

    }

    presentAlert(msg1, msg2) {
        let alert = this.alertCtrl.create({
            title: msg1,
            subTitle: msg2,
            buttons: ['OK']
        });
        alert.present();
    }



    mostrar_usuario() {

        // this.cargar_storage();

        console.log("token desde metodo mostar_usuario");
        console.log(this.token);
        return this.http.get(URL_SHOW_USER, this.options2).map((response: Response) => response.json());

    }



    mostrar_sitios() {
        return this.http.get(URL_SHOW_USER, this.options2).map((response: Response) => response.json());

    }

    cerrar_sesion() {
        this.presentLoadingDefault('Cerrando sesion..');
        this.token = null;
        this.id_usuario = null;

        //guardar storage
        this.guardar_storage();
        this.events.publish('user:menu');

    }

    public guardar_storage() {


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

        return this.http.post(URL_SIGNUP, form).subscribe(
            data => console.log(data),
            error => console.log(error)
        )


    }

    presentToast() {
        let toast = this.toastCtrl.create({
            message: 'Bienvenido',
            duration: 3000,
            position: 'bottom'
        });

        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });

        toast.present();
    }




    presentLoadingDefault(message: string) {
        let loading = this.loadingCtrl.create({
            content: message
        });

        loading.present();

        setTimeout(() => {
            loading.dismiss();
        }, 2000);
    }



}