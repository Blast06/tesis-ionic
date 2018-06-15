import { Storage } from '@ionic/storage';


import { AlertController, Platform, ModalController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioProvider } from './usuario.service';

import { CarritoPage, LoginPage } from "../pages/index.paginas";


/*
  Generated class for the CarritoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CarritoProvider {

  items: any[] = [];

  constructor(public http: HttpClient,
    private alertCtrl: AlertController,
    private platform: Platform,
    private storage: Storage,
    private usuarioService: UsuarioProvider,
    private modalCtrl: ModalController) {
    console.log('Hello CarritoProvider Provider');
    this.cargar_storage();
  }

  ver_carrito() {

    let modal:any;

    if (this.usuarioService.token) {
      modal = this.modalCtrl.create(CarritoPage);


    } else {
      modal = this.modalCtrl.create(LoginPage);
    }

    modal.present();


    
    modal.onDidDismiss((abrirCarrito: boolean) => {

      if (abrirCarrito) {
        this.modalCtrl.create(CarritoPage);
      }
    });








  }


  agregar_carrito(item_parametro: any) {

    for (let item of this.items) {
      if (item.id == item_parametro.id) {

        this.alertCtrl.create({
          title: "Item existe",
          subTitle: item_parametro.name + ", ya se encuentra en su carrito de compras",
          buttons: ["OK"]
        }).present();

        return;
      }
    }

    this.items.push(item_parametro);
    this.guardar_storage();
  }


  private guardar_storage() {

    if (this.platform.is("cordova")) {
      //dispositivo
      this.storage.set('items', this.items);

    } else {
      //computadora

      localStorage.setItem("items", JSON.stringify(this.items));

    }


  }


  cargar_storage() {

    let promesa = new Promise((resolve, reject) => {


      if (this.platform.is("cordova")) {
        //dispositivo
        this.storage.ready()
          .then(() => {

            this.storage.get("items")
              .then(items => {
                if (items) {
                  this.items = items;

                }
                resolve();
              });

          });


      } else {
        //computadora

        //existe item en el localstorage
        if (localStorage.getItem("items")) {

          this.items = JSON.parse(localStorage.getItem("items"));
        }

        resolve();
      }

    });

    return promesa;


  }



}
