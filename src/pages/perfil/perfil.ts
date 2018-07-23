import { Platform } from 'ionic-angular';

import { Component, ViewChild, Renderer, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, Content, ModalController } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/index.services';
import { User } from '../../app/models/user';
import { Observable } from 'rxjs/Observable';
import { MisSitiosPage } from '../mis-sitios/mis-sitios';
import { Storage } from "@ionic/storage";




@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  @ViewChild('pageSlider') pageSlider: Slides;
  @ViewChild('mySlider') slider: Slides;
  @ViewChild(Content) content: Content;

  slides: any;
  tabs: any = '0';

  searching: any = false;

  header: any;
  headerHeight: any;
  translateAmt: any;
  darkHeader: any;

  user: User;

  websites: any[] = [];

  page = MisSitiosPage;

  username: any;



  constructor(public navCtrl: NavController,
    public renderer: Renderer,
    public zone: NgZone,
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public _us: UsuarioProvider,
    public platform: Platform,
    public storage: Storage) {


    
    _us.mostrar_usuario().subscribe((data: any) => {
      
      console.log(data);
      this.user = data.data;
      console.log(data.data.websites);
      this.websites = this.user.websites;

      if (this.user) {
        this.searching = false;
        
      }
      

      if (this.platform.is("cordova")) {
        //dispositivo

        this.storage.set('websites', JSON.stringify(this.websites));
      } else {
        //computadora
        if (this.websites) {

          localStorage.setItem('websites', JSON.stringify(this.websites));



        } else {
          localStorage.removeItem("websites");

        }

      }


    });


  }

  goTowebsite(username) {
    this.username = username
    this.navCtrl.push(this.page, { username: this.username });
  }

  getUserInfo() {
    this._us.mostrar_usuario().subscribe((data: any) => {
      console.log(data);
      this.user = data.data;
      console.log(data.data.email);
      console.log(data.data.name);

    });

  }

  scrollingFun(ev) {
    ev.domWrite(() => {
      this.updateHeader(ev);
      //
    });
  }

  updateHeader(ev) {
    if (ev.scrollTop >= 0) {
      this.translateAmt = -ev.scrollTop / 2;
      if (this.translateAmt < -210) {
        this.translateAmt = -210;
      }
    }
    if (ev.scrollTop >= 250) {
      this.renderer.setElementClass(this.header, 'userInfo', true);
    } else this.renderer.setElementClass(this.header, 'userInfo', false);


    this.zone.run(() => {
      this.renderer.setElementStyle(this.header, 'webkitTransform', 'translate3d(0,' + this.translateAmt + 'px,0)');
    });
  }



  ngAfterViewInit() {
    var length = document.getElementsByClassName("myHeader").length - 1;
    this.header = document.getElementsByClassName("myHeader")[length];
    // var lengthToolbar=document.getElementsByClassName("toolbar-background-md").length -1;
    // this.headerHeight = this.header.clientHeight;
  }

  selectTab(index) {
    this.pageSlider.slideTo(index);
    this.content.scrollToTop();
  }
  // for changeWillSlide
  changeWillSlide($event) {
    this.tabs = $event._snapIndex.toString();
    setTimeout(() => {
      this.content.scrollToTop();
    }, 200)
  }

  presentCartModal() {
    let modal = this.modalCtrl.create('Cart');
    modal.present();
  }


}