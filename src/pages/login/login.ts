import { AlertController } from 'ionic-angular';
import { UsuarioProvider } from './../../providers/index.services';

import { RegistroPage } from './../registro/registro';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Events } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import 'rxjs/add/operator/catch';




@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    registro = RegistroPage;
    email: string = '';
    password: string = '';

    user: any;

    loginForm: FormGroup;

    isLogin: boolean = false;
    attemptedSubmit: boolean = false;

    error: any;
    data: any;


    constructor(public fb: FormBuilder,
        private navCtrl: NavController,
        private usuarioService: UsuarioProvider,
        private viewCtrl: ViewController,
        public events: Events,
        public alertCtrl: AlertController, ) {


        this.loginForm = fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });


    }

    ingresar() {
        this.usuarioService.ingresar(this.email, this.password).subscribe(
            // data => console.log('sucess', this.data = data),
            // error => console.log('OOPS', this.error = error.error)
            (data: any) => {
                //success catch
                console.log(data)
                this.data = data;
                console.log(this.data);
                this.usuarioService.token = data.access_token;
                this.usuarioService.guardar_storage();
                this.usuarioService.presentLoadingDefault('Iniciando sesion..');
                this.events.publish('user:menu');
                this.viewCtrl.dismiss(true);

            }, // catch errors
            (error: any) => {
                console.log(error)
                this.error = error;
                console.log(this.error);
                this.presentAlert('Error', 'Sus credenciales son incorrectas');
            }
        );
    }

    presentAlert(msg1, msg2) {
        let alert = this.alertCtrl.create({
            title: msg1,
            subTitle: msg2,
            buttons: ['OK']
        });
        alert.present();
    }


    handleData(data) {
        this.usuarioService.token = data;
        console.log(data);
    }
    handleError(error) {
        this.error = error;
        console.log(error);
    }


    formSettings = {
        theme: 'ios'
    };


    irRegistro() {
        this.navCtrl.push(this.registro);
    }

    markFieldsDirty() {
        for (var field in this.loginForm.controls) {
            this.loginForm.controls[field].markAsDirty();
        }
    }




    //mensajes para los tipos de errores
    errorMessages = {
        required: '{$1} requerido',
        minlength: 'AL menos 6 caracteres',
        email: 'Email incorrecto'
    }

    errorFor(fieldName) {
        var field = this.loginForm.controls[fieldName];
        for (var validator in field.errors) {
            if (field.errors[validator]) {
                var friendlyName = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
                return this.errorMessages[validator].replace('{$1}', friendlyName);
            }
        }
        return null;
    }

    ngOnInit() {

    }


}



