import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TipoAstaRoutingModule } from './tipo-asta-routing.module';
import { TipoAstaComponent } from './tipo-asta.component';
import { TipoAstaCreateComponent } from './Components/tipo-asta-create/tipo-asta-create.component';
import { TipoAstaEditComponent } from './Components/tipo-asta-edit/tipo-asta-edit.component';

@NgModule({
  declarations: [
    TipoAstaComponent,
    TipoAstaCreateComponent,
    TipoAstaEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TipoAstaRoutingModule
  ]
})
export class TipoAstaModule { }
