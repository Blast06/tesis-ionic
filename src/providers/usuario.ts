import { URL_BASE } from './../URLs/url.servicios';


import { Injectable } from "@angular/core";
import { Http, URLSearchParams, HttpModule, Response } from "@angular/http";
import 'rxjs/add/operator/map';

import { Storage } from "@ionic/storage";
// import { IonicStorageModule } from '@ionic/storage';

import { AlertController, Platform } from "ionic-angular";
import { FormGroup } from '@angular/forms';


@Injectable()
export class UsuarioProvider {

    token: string;
    id_usuario: string;
    
    signupForm: FormGroup;

    constructor(private http: Http,
        private alertCtrl: AlertController,
        private platform: Platform,
        private storage: Storage) {

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

        let url = URL_BASE + '/login';

        return this.http.post(url, body).map(data_resp => {

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
                this.id_usuario = body2.id;
                //guardar storage
            }
        });
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


    registrar(name:string,email:string,password:string,password_confirmation:string){
        let form ={
            name:name,
            email: email,
            password:password,
            password_confirmation:password_confirmation
            
        };

        return this.http.post(URL_BASE + '/signup', form).subscribe(
            data => console.log(data),
            error => console.log(error)
        )

        
    }

}