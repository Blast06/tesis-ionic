import { PorCategoriaPage } from './../por-categoria/por-categoria';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { User } from '../../app/models/user';
import { Storage } from "@ionic/storage";
import { UsuarioProvider, ArticlesProvider } from '../../providers/index.services';
import { Validators, FormGroup, FormBuilder } from '../../../node_modules/@angular/forms';
// import { FormControl } from '../../../node_modules/@mobiscroll/angular/src/js/classes/form-control';
import { CrearSitiosPage } from '../crear-sitios/crear-sitios';


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



  public currentNumber = 0;

  user: User;
  websites: any[] = [];
  searching: any = false;

  show: boolean = false;
  website_slug: any;

  title: string;
  price: number;
  estatus: any;

  public todo: FormGroup;




  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public platform: Platform,
    public _us: UsuarioProvider,
    public fb: FormBuilder,
    public articleService: ArticlesProvider,
    public alertCtrl:AlertController, ) {

    this.todo = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      price: ['', [Validators.required,Validators.pattern('[0-9]*')]],
      stock: ['', [Validators.required]],
      sub_category_id: ['', [Validators.required]],
      status: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(20)]],
    });





    _us.mostrar_usuario().subscribe((data: any) => {
      console.log(data);
      this.user = data.data;
      console.log(data.data.websites);
      this.websites = this.user.websites;


      if (this.user) {
        this.searching = false;

      }

    });



  }

  logForm() {
    console.log(this.todo.value);
    console.log(this.todo.value.name);
    console.log(this.todo.value.name);
  }





  sendId(website_slug) {
    this.website_slug = website_slug;
    console.log(this.website_slug);
    this.show = true;
  }


  createArticle() {
    console.log(this.website_slug);
    this.articleService.createArticle(this.todo.value.name,this.todo.value.description,
      this.todo.value.price,this.todo.value.status,this.todo.value.stock,this.todo.value.sub_category_id, this.website_slug).subscribe((data) => {
      console.log(data);
      this.presentAlert('Hecho', 'Tu articulo ha sido creado');
    },
      (error: any) => {
        console.log(error);
        this.presentAlert('Error', 'Revisa tu plan para ver que ha pasado');
      }

    );
  }

  presentAlert(ms1, ms2) {
    let alert = this.alertCtrl.create({
      title: ms1,
      subTitle: ms2,
      buttons: ['OK']
    });
    alert.present();
  }






  crearSitio() {
    this.navCtrl.push(CrearSitiosPage);
  }




  ionViewDidLoad() {

  }

}
