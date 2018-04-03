import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InsulinPage } from './insulin';

@NgModule({
  declarations: [
    InsulinPage,
  ],
  imports: [
    IonicPageModule.forChild(InsulinPage),
  ],
})
export class InsulinPageModule {}
