import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/index.services';

/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  public person: { name: string, company: string, birthdate?: number };
  dob: any;
  age: any;
  showProfile: boolean;

  user: any;
  id_usuario: number;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public _us: UsuarioProvider, ) {

   
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');


    

    this.user = this._us.getUser(this.id_usuario);

    console.log("user data: " + this.user);

  }

  

  

}
