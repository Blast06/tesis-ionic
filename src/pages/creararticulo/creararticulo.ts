import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
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
  estatus:any;
  
  public todo: FormGroup;

 


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public platform: Platform,
    public _us: UsuarioProvider,
    public fb: FormBuilder,
    public articleService:ArticlesProvider,) {

    this.todo = this.fb.group({
      name: ['', [Validators.required,Validators.minLength(4),Validators.maxLength(30)]],
      price: ['', [Validators.required]],
      stock: ['',[Validators.required]],
      sub_category_id:['', [Validators.required]],
      status: ['',[Validators.required]],
      description: ['', [Validators.required,Validators.minLength(20)]],
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

    
  }

  



  sendId(website_slug) {
    this.website_slug = website_slug;
    console.log(this.website_slug);
    this.show = true;
  }


  createArticle(){
    console.log(this.website_slug);
    this.articleService.createArticle(this.todo.value,this.website_slug).subscribe((data) =>{
      console.log(data);
    });
  }

  


 

  crearSitio(){
    this.navCtrl.push(CrearSitiosPage);
  }

  


  ionViewDidLoad() {

  }

}
