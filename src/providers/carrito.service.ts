import { Http } from '@angular/http';

import { Storage } from '@ionic/storage';


import { AlertController, Platform, ModalController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioProvider } from './usuario.service';
import { Headers, RequestOptions, Response } from '@angular/http';

import { CarritoPage, LoginPage } from "../pages/index.paginas";
import { URL_SHOPPING_CART, URL_REMOVE_ARTICLE_SHOPPING_CART, URL_ADD_ARTICLE_SHOPPING_CART, URL_SHOPPING_CART_COUNT, URL_MAKE_ORDER } from '../URLs/url.servicios';



@Injectable()
export class CarritoProvider {

  headers = new Headers();

  private options;


  items: any[] = [];
  total_carrito: number = 0;
  carritoBadgeCounter: number = 0;

  public token: any;

  constructor(public http: HttpClient,
    private alertCtrl: AlertController,
    private platform: Platform,
    private storage: Storage,
    private usuarioService: UsuarioProvider,
    private modalCtrl: ModalController,
    public http2: Http, ) {
    console.log('Hello CarritoProvider Provider');
    this.cargar_storage();
    this.actualizar_total();

    // sacar token del storage
    this.token = usuarioService.token;

    // this.getCarritoCounter();


    //config de headers para la peticion
    this.headers.append("Accept", "Application/json");
    // this.headers.append("Content-Type", "undefined");
    // this.headers.append('Access-Control-Allow-Origin', '*');
    this.headers.append("Authorization", "Bearer " + usuarioService.token);
    this.options = new RequestOptions({ headers: this.headers });

  }


  ver_carrito() {

    let modal: any;

    if (this.usuarioService.token) {
      modal = this.modalCtrl.create(CarritoPage);
      // this.getCartItemsCount().subscribe((data:any) =>{
      //   console.log(data);
      // });


    } else {
      modal = this.modalCtrl.create(LoginPage);
    }

    modal.present();



    modal.onDidDismiss((abrirCarrito: boolean) => {

      if (abrirCarrito) {
        this.modalCtrl.create(CarritoPage).present();
      }
    });










  }



  actualizar_total() {
    this.total_carrito = 0;

    for (let item of this.items) {
      this.total_carrito += Number(item.price);
    }

  }

  getCart() {
    console.log("TOKEN EN GETCART - CARRITOSERVICE.TS");
    console.log(this.token);
    return this.http2.get(URL_SHOPPING_CART, this.options).map((response: Response) => response.json());


  }

  getCartItemsCount() {
    return this.http2.get(URL_SHOPPING_CART_COUNT, this.options).map((response: Response) => response.json());
  }

  addToCart(id, cantidad) {
    console.log("TOKEN EN ADDTOCART - CARRITOSERVICE.TS");
    console.log(this.token);
    return this.http2.get(URL_ADD_ARTICLE_SHOPPING_CART + "/" + id + "/add/" + cantidad + "/cart", this.options).map((response: Response) => response.json());


  }

  removeFromCart(id) {
    console.log("TOKEN EN REMOVEFROMCART - CARRITOSERVICE.TS");
    console.log(this.token);
    return this.http2.get(URL_REMOVE_ARTICLE_SHOPPING_CART + "/" + id + "/remove/cart", this.options).map((response: Response) => response.json());

  }

  makeOrder(orders) {
    console.log("TOKEN EN MAKEORDER - CARRITOSERVICE.TS");
    console.log(this.token);
    return this.http2.post(URL_MAKE_ORDER,orders, this.options).map((response: Response) => response.json());
  }

  getOrders() {
    console.log("TOKEN EN GETORDER - CARRITOSERVICE.TS");
    console.log(this.token);
    return this.http2.get(URL_MAKE_ORDER, this.options).map((response: Response) => response.json());
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
