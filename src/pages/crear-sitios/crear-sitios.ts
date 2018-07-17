import { WebsiteProvider } from './../../providers/website.service';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from "@ionic/storage";

/**
 * Generated class for the CrearSitiosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-crear-sitios',
  templateUrl: 'crear-sitios.html',
})
export class CrearSitiosPage {

  name: string = '';
  username: string = '';
  user_id: number = 118;
  createWebsiteForm: FormGroup;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public fb: FormBuilder,
    public websiteService: WebsiteProvider,
    public storage: Storage, ) {

    this.createWebsiteForm = fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      username: ['', [Validators.required, Validators.minLength(4)]]
    });

  }

  crearSitio() {
    console.log("DATOS en crearsitios.ts: " + this.createWebsiteForm.value);
  }

  getUserId() {
    this.storage.get('id_usuario').then((id) => {
      this.user_id = id;
    });
  }




}

