import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WebsiteArticlesPage } from './website-articles';

@NgModule({
  declarations: [
    WebsiteArticlesPage,
  ],
  imports: [
    IonicPageModule.forChild(WebsiteArticlesPage),
  ],
})
export class WebsiteArticlesPageModule {}
