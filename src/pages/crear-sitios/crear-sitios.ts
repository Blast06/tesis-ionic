import { WebsiteProvider } from './../../providers/website.service';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { UsuarioProvider } from '../../providers/index.services';
import { User } from '../../app/models/user';



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
  datos: any;




  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public fb: FormBuilder,
    public websiteService: WebsiteProvider,
    public storage: Storage,
    public _us: UsuarioProvider,
    public platform: Platform, ) {





    this.createWebsiteForm = fb.group({
      name: ['', [Validators.required, Validators.minLength(4),Validators.maxLength(40),Validators.pattern('[a-zA-Z0-9]*')]],
      username: ['', [Validators.required, Validators.minLength(4),Validators.maxLength(40),Validators.pattern('[a-zA-Z0-9]*')]]
    });
  }

  crearSitio() {
    //quitar espacios en ambos campos
    this.name = this.name.toString().trim();
    this.username = this.username.toString().trim();

    //imprimir esos datos para ver como estan
    console.log("DATOS en crearsitios.ts: " + this.name, this.username);
    

    //hacer la peticion post para crear el sitio
    this.websiteService.crear_sitio(this.name, this.username).subscribe( (data) => {
    
    })

    

  }

  getUserId() {
    this.storage.get('id_usuario').then((id) => {
      this.user_id = id;
    });
  }




}

