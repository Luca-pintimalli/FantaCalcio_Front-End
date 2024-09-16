import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RuoliRoutingModule } from './ruoli-routing.module';
import { RuoliComponent } from './ruoli.component';


@NgModule({
  declarations: [
    RuoliComponent
  ],
  imports: [
    CommonModule,
    RuoliRoutingModule
  ]
})
export class RuoliModule { }
