import { Injectable } from "@angular/core";

//http
import { Http, Response, Headers } from "@angular/http";
import 'rxjs/add/operator/catch';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

//API ENDPOINTS
import { URL_SIGNUP, URL_LOGIN, URL_SHOW_USER, URL_SHOPPING_CART } from './../URLs/url.servicios';



//plugins misc
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

const SECRET_KEY = "s0Q7G10XdrxwJCUmGd4pVOgIwEJlORo2nbSqg8c4";





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
        public loadingCtrl: LoadingController, ) {
        this.cargar_storage();


    }

    token_activo(): boolean {
        if (this.token) {
            return true

        } else {
            return false;
        }

    }

    getFavorites() {
        return this.http2.get(URL_SHOPPING_CART);
    }


    ingresar(username: string, password: string) {

        let body = {
            username: username,
            password: password,
            client_secret: SECRET_KEY,
            client_id: CLIENT_ID,
            grant_type: "password"
        };


        return this.http2.post(URL_LOGIN, body,{headers:
            {'Accept':'Application/json', 'Content-Type': 'Application/json',
            'Access-Control-Allow-Origin':'*'} });

        // return this.http2.post(URL_LOGIN,body, httpOptionsLogin);

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
        console.log("token desde metodo mostar_usuario");
        console.log(this.token);
        // return this.http.get(URL_SHOW_USER, this.options2).map((response: Response) => response.json());
        return this.http2.get(URL_SHOW_USER);

    }



    mostrar_sitios() {
        return this.http.get(URL_SHOW_USER).map((response: Response) => response.json());

    }

    cerrar_sesion() {
        this.presentLoadingDefault('Cerrando sesion..');
        this.token = null;
        // this.id_usuario = null;

        //borrar storage
        this.borrar_storage();
        this.events.publish('user:menu');

    }

    public borrar_storage() {

        if (this.platform.is("cordova")) {
            //dispositivo
            this.storage.remove('token');
            this.storage.clear();
        } else {
            //computadora
            localStorage.removeItem('token');
            localStorage.clear();

        }

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
              

                this.storage.get('token').then(val =>{
                    if (val) {
                        this.token = val
                        resolve(true);
                        
                    }else{
                        resolve(false);
                    }
                });

                


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