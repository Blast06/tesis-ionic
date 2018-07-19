import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MainListPage } from './main-list';

@NgModule({
  declarations: [
    MainListPage,
  ],
  imports: [
    IonicPageModule.forChild(MainListPage),
  ],
})
export class MainListPageModule {}
