import { Http, RequestOptionsArgs } from '@angular/http';

import { Storage } from '@ionic/storage';


import { Platform, ModalController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioProvider } from './usuario.service';
import { Headers } from '@angular/http';

import { CarritoPage, LoginPage } from "../pages/index.paginas";
import { URL_SHOPPING_CART, URL_REMOVE_ARTICLE_SHOPPING_CART, URL_ADD_ARTICLE_SHOPPING_CART, URL_SHOPPING_CART_COUNT, URL_MAKE_ORDER } from '../URLs/url.servicios';



@Injectable()
export class CarritoProvider {

  headers = new Headers();

  private options:RequestOptionsArgs;


  items: any[] = [];
  total_carrito: number = 0;
  carritoBadgeCounter: number = 0;

  public token: any;

  constructor(public http: HttpClient,
    private platform: Platform,
    private storage: Storage,
    private _usuarioService: UsuarioProvider,
    private modalCtrl: ModalController,
    public http2: Http, ) {
    console.log('Hello CarritoProvider Provider');
    this.actualizar_total();

  }


  ver_carrito() {

    let modal: any;

    if (this._usuarioService.token) {
      modal = this.modalCtrl.create(CarritoPage);

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
    return this.http.get(URL_SHOPPING_CART);
  }

  getCartItemsCount() {
    return this.http.get(URL_SHOPPING_CART_COUNT);
  }

  addToCart(id, cantidad) {
    return this.http.get(URL_ADD_ARTICLE_SHOPPING_CART + "/" + id + "/add/" + cantidad + "/cart");


  }

  removeFromCart(id) {
    return this.http.get(URL_REMOVE_ARTICLE_SHOPPING_CART + "/" + id + "/remove/cart");

  }

  makeOrder(orders1 = []) {
    return this.http.post(URL_MAKE_ORDER, { orders: orders1 });
  }

  getOrders() {
    return this.http.get(URL_MAKE_ORDER);
  }



}
