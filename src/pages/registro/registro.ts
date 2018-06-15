import { UsuarioProvider } from '../../providers/usuario.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { mobiscroll } from '@mobiscroll/angular';


/**
 * Generated class for the RegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  // public form = {
  //   name: null,
  //   email : null,
  //   password: null
  // };


  name: string = '';
  email: string = '';
  password: string = '';
  password_confirmation: string = '';
  signupForm: FormGroup;

  attemptedSubmit: boolean = false;




  constructor(private _us:UsuarioProvider, private fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', [Validators.required, Validators.minLength(6)]]

    })


  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
  }

  registrar() {
    console.log(this.signupForm.value);
    this._us.registrar(this.name,this.email,this.password,this.password_confirmation);

    


  }

  //mensajes para los tipos de erroes
  errorMessages = {
    required: '{$1} requerido',
    minlength: 'AL menos 6 caracteres',
    email: 'Email incorrecto'
  }

  markFieldsDirty() {
    for (var field in this.signupForm.controls) {
      this.signupForm.controls[field].markAsDirty();
    }
  }

  errorFor(fieldName) {
    var field = this.signupForm.controls[fieldName];
    for (var validator in field.errors) {
      if (field.errors[validator]) {
        var friendlyName = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
        return this.errorMessages[validator].replace('{$1}', friendlyName);
      }
    }
    return null;
  }

  signUp(ev) {
    this.attemptedSubmit = true;
    if (this.signupForm.valid) {
        mobiscroll.toast({
            message: 'Signed Up!',
            callback: function () {
                this.signupForm.reset();
                this.attemptedSubmit = false;
            }.bind(this)
        });
    } else {
        this.markFieldsDirty();
    }
}



}
