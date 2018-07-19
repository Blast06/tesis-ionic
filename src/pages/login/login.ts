import { UsuarioProvider } from './../../providers/index.services';

import { RegistroPage } from './../registro/registro';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Events } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { mobiscroll } from '@mobiscroll/angular';




@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  registro = RegistroPage;
  correo:string = '';
  clave:string = '';

  user:any;

  constructor(private fb: FormBuilder, 
              private navCtrl: NavController, 
              private navParams: NavParams, 
              private usuarioService: UsuarioProvider,
              private viewCtrl: ViewController,
              public events:Events,  ) {
    this.loginForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });


  }
  ingresar(){
      this.usuarioService.ingresar(this.correo,this.clave)
      .subscribe(()=>{
          console.log("DATOS A ENVIAR: " + this.correo,this.clave);

          if (this.usuarioService.token_activo()) {
              this.viewCtrl.dismiss(true);
              
          }
          

      });
      

  }

  loginForm: FormGroup;

  isLogin: boolean = false;
  attemptedSubmit: boolean = false;

  formSettings = {
    theme: 'ios'
  };

 
    irRegistro(){
      this.navCtrl.push(this.registro);
    }

    markFieldsDirty() {
      for (var field in this.loginForm.controls) {
          this.loginForm.controls[field].markAsDirty();
      }
  }




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


  
