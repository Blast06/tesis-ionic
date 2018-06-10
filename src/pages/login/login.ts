import { UsuarioProvider } from './../../providers/index.services';

import { RegistroPage } from './../registro/registro';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { mobiscroll } from '@mobiscroll/angular';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  registro = RegistroPage;
  correo:string = '';
  clave:string = '';


  

  constructor(private fb: FormBuilder, private navCtrl: NavController, private navParams: NavParams, private usuarioService: UsuarioProvider) {
    this.loginForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });


  }
  ingresar(){
      this.usuarioService.ingresar(this.correo,this.clave)
      .subscribe(()=>{
          console.log("DATOS A ENVIAR: " + this.correo,this.clave);

      });

  }

  loginForm: FormGroup;

  isLogin: boolean = false;
  attemptedSubmit: boolean = false;

  formSettings = {
    theme: 'ios'
  };

  

  ionViewDidLoad() {
      console.log('ionViewDidLoad LoginPage');
    }

    irRegistro(){
      this.navCtrl.push(this.registro);
    }

    markFieldsDirty() {
      for (var field in this.loginForm.controls) {
          this.loginForm.controls[field].markAsDirty();
      }
  }

//   signUp(ev) {
//       this.attemptedSubmit = true;
//       if (this.loginForm.valid) {
//           mobiscroll.toast({
//               message: 'Signed Up!',
//               callback: function () {
//                   this.loginForm.reset();
//                   this.attemptedSubmit = false;
//               }.bind(this)
//           });
//       } else {
//           this.markFieldsDirty();
//       }
//   }

//   logIn(ev) {
//       this.attemptedSubmit = true;
//       if (this.loginForm.valid) {
//           mobiscroll.toast({
//               message: 'Logged In!',
//               callback: function () {
//                   this.loginForm.reset();
//                   this.attemptedSubmit = false;
//               }.bind(this)
//           });
//       } else {
//           this.markFieldsDirty();
//       }
//   }

  //mensajes para los tipos de erroes
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

  



}


  
