import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { NgCircleProgressModule } from 'ng-circle-progress';

import { Tab1PageRoutingModule } from './tab1-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule,
    // circle progress module for displaying battery percentages
    NgCircleProgressModule.forRoot({
      "radius": 150,
      "space": -10,
      // "outerStrokeGradient": true, //not working on ios emulator
      "outerStrokeWidth": 10,
      "outerStrokeColor": "#4882c2",
      // "outerStrokeGradientStopColor": "#2ecc71", //not working on ios emulator
      "innerStrokeColor": "#e7e8ea",
      "innerStrokeWidth": 10,
      "titleColor": "#595959",
      "titleFontSize": '30',
      "showTitle": true,
      "showSubtitle": false,
      "animateTitle": false,
      "animationDuration": 1000,
      "showUnits": false,
      "showBackground": false,
      "clockwise": false,
      "startFromZero": false,
      "lazy": false,
    })
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule { }
