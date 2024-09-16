import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalitaComponent } from './modalita.component';
import { ModalitaRoutingModule } from './modalita-routing.module';
import { ModalitaCreateComponent } from './Componets/modalita-create/modalita-create.component';
import { ModalitaEditComponent } from './Componets/modalita-edit/modalita-edit.component';

@NgModule({
  declarations: [
    ModalitaComponent,
    ModalitaCreateComponent,
    ModalitaEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalitaRoutingModule
  ]
})
export class ModalitaModule { }
