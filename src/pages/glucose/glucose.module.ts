import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GlucosePage } from './glucose';

@NgModule({
  declarations: [
    GlucosePage,
  ],
  imports: [
    IonicPageModule.forChild(GlucosePage),
  ],
})
export class GlucosePageModule {}
