import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { User } from '../../app/models/user';
import { Storage } from "@ionic/storage";
import { UsuarioProvider } from '../../providers/index.services';
import { Validators, FormGroup, FormBuilder } from '../../../node_modules/@angular/forms';
import { FormControl } from '../../../node_modules/@mobiscroll/angular/src/js/classes/form-control';


/**
 * Generated class for the CreararticuloPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-creararticulo',
  templateUrl: 'creararticulo.html',
})
export class CreararticuloPage {

  form: FormGroup;

  public currentNumber = 0;

  user: User;
  websites: any[] = [];
  searching: any = false;

  show: boolean = false;
  website_slug: any;

  title: string;
  price: number;
  autoManufacturers: boolean;
  public todo: FormGroup;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public platform: Platform,
    public _us: UsuarioProvider,
    public fb: FormBuilder) {

    this.todo = this.fb.group({
      title: ['', Validators.required],
      description: [''],
    });





    this.form = fb.group({
      title: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(40), Validators.pattern('[a-zA-Z0-9]*')]],
      price: ['', [Validators.required]]

    });



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

  logForm() {
    console.log(this.todo.value)
  }

  createWebsiteForm() {
    console.log(this.form.value);
  }



  sendId(website_slug) {
    this.website_slug = website_slug;
    console.log(this.website_slug);
    this.show = true;
  }


  private increment() {
    this.currentNumber++;
  }

  private decrement() {
    this.currentNumber--;
  }


  ionViewDidLoad() {

  }

}
