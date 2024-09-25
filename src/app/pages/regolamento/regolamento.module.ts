import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegolamentoRoutingModule } from './regolamento-routing.module';
import { RegolamentoComponent } from './regolamento.component';


@NgModule({
  declarations: [
    RegolamentoComponent
  ],
  imports: [
    CommonModule,
    RegolamentoRoutingModule
  ]
})
export class RegolamentoModule { }
