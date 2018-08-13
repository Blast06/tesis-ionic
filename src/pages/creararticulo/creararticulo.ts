import { Camera, CameraOptions } from '@ionic-native/camera';
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

  user:any[] = [];
  websites: any[] = [];
  searching: any = false;

  show: boolean = false;
  website_slug: any;

  title: string;
  price: number;
  estatus: any;

  article_id: any;
  mypic: any;

  public todo: FormGroup;




  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public platform: Platform,
    public _us: UsuarioProvider,
    public fb: FormBuilder,
    public articleService: ArticlesProvider,
    public alertCtrl: AlertController,
    public camera: Camera, ) {

    // this.getArticleInfo();

    this.todo = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      price: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(3), Validators.maxLength(7)]],
      stock: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(4)]],
      sub_category_id: ['', [Validators.required]],
      status: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(20)]],
    });


  }

  ionViewWillEnter() {
    console.log("IONVIEWWILLENTER");
    this.getArticleInfo();

  }

  getArticleInfo() {
    this._us.mostrar_usuario().map(res => res.json())
    .subscribe((data: any) => {
      console.log("DATA MOSTRANDO TODO: ", JSON.stringify(data));
      this.user = data.data;
      console.log("DATA MOSTRANDO USER: ", this.user);
      console.log("DATA MOSTRANDO LOS WEBSITES: ", JSON.stringify(data.data.websites));
      this.websites = data.data.websites;

      console.log("DATOS DEL USUARIO: ",this.user);
      



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

  getImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType:this.camera.EncodingType.JPEG,
      mediaType:this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then((imageData) => {

      this.mypic = 'data:image/jpeg;base64,' + imageData;
    },
      (error) => {
        console.log(error)
      }
    );


  }


  createArticle() {
    console.log(this.website_slug);
    this.articleService.createArticle(this.todo.value.name, this.todo.value.description,
      this.todo.value.price, this.todo.value.status, this.todo.value.stock, this.todo.value.sub_category_id, this.website_slug).subscribe((data: any) => {
        console.log(data);
        console.log(data.data.id);
        this.article_id = data.data.id;
        console.log("Este es el id del articulo:", this.article_id);
        this.uploadImg(this.article_id,this.mypic);
        this.presentAlert('Hecho', 'Tu articulo ha sido creado');
      },
        (error: any) => {
          console.log(error);
          this.presentAlert('Error', 'Revisa tu plan para ver que ha pasado');
        }

      );
  }

  uploadImg(article_id, img) {
    let postData = new FormData();
    postData.append('file', img);
    this.articleService.sendArticleImg(article_id, postData).subscribe((data: any) => {
      console.log("CONSOLELOG DEL DATA DE SUBIR IMAGEN",JSON.stringify(data));
    },
      (error: any) => {
        console.log("CONSOLE LOG DE ERROR SUBIR IMAGEN",JSON.stringify(error));
      });


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
