import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MainListPage } from './main-list';
import { NgAisModule } from 'angular-instantsearch';

@NgModule({
  declarations: [
    MainListPage,

  ],
  imports: [
    IonicPageModule.forChild(MainListPage),
    NgAisModule,
  ],
})
export class MainListPageModule {}
