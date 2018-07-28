import { Observable } from 'rxjs/Observable';
import { URL_SIGNUP, URL_LOGIN, URL_SHOW_USER } from './../URLs/url.servicios';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';



import { Injectable } from "@angular/core";
import { Http, URLSearchParams, HttpModule, Response, Headers, RequestOptions } from "@angular/http";
//import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';

import { Storage } from "@ionic/storage";
// import { IonicStorageModule } from '@ionic/storage';

import { AlertController, Platform, ToastController, Events } from "ionic-angular";
import { FormGroup } from '@angular/forms';
import { User } from '../app/models/user';




const CLIENT_ID = "2";
const SECRET_KEY = "4iePfltyExYRbbHpp1eLNISZ3Y66ACKk7uQy1RzL";

@Injectable()
export class UsuarioProvider {

    public token: string;
    public id_usuario: string;



    user: any[] = [];



    headers = new Headers();
    headers2 = new Headers();

    private options;
    private options2;



    signupForm: FormGroup;

    constructor(private http: Http,
        private alertCtrl: AlertController,
        private platform: Platform,
        private storage: Storage,
        private http2: HttpClient,
        private toastCtrl: ToastController,
        public events: Events) {
        this.cargar_storage();


        //para el login
        this.headers.append("Accept", "Application/json");
        this.headers.append("Content-Type", "Application/json");

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


    ingresar(username: string, password: string) {

        let body = {
            username: username,
            password: password,
            client_secret: SECRET_KEY,
            client_id: CLIENT_ID,
            grant_type: "password"
        };

        let body2;

        return this.http.post(URL_LOGIN, body, this.options).map(data_resp => {

            console.log("DATOS A ENVIAR(DENTRO DEL USUARIO en usuarioSERVICE): ");

            //convertir el body en json() 
            body2 = data_resp.json() || {};
            console.log("body2 hola");


            if (body2.status) {
                this.alertCtrl.create({
                    title: 'Error al iniciar',
                    subTitle: "Revise su informacion",
                    buttons: ["OK"]
                }).present();

                console.log("body2");
            } else {

                this.presentToast();

                this.token = body2.access_token;
                //this.id_usuario = body2.user;

                //guardar storage
                this.guardar_storage();
                //para actualizar el side menu
                this.events.publish('user:menu');
            }

        });


    }

    mostrar_usuario() {
        console.log(this.token);
        return this.http.get(URL_SHOW_USER, this.options2).map((response: Response) => response.json());
        
    }
    mostrar_sitios() {
        return this.http.get(URL_SHOW_USER, this.options2).map((response: Response) => response.json());
        
    }

    cerrar_sesion() {
        this.token = null;
        this.id_usuario = null;

        //guardar storage
        this.guardar_storage();
        this.events.publish('user:menu');

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


    getUser(id_usuario): Observable<User[]> {
        id_usuario = this.id_usuario;

        return this.http.post(URL_SHOW_USER, id_usuario).map((response: Response) => response.json());

    }



}