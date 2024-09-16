import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // Importa RouterModule qui


import { ModalitaComponent } from './modalita.component';
import { ModalitaRoutingModule } from './modalita-routing.module';
import { ModalitaListComponent } from './Componets/modalita-list/modalita-list.component';
import { ModalitaCreateComponent } from './Componets/modalita-create/modalita-create.component';
import { ModalitaEditComponent } from './Componets/modalita-edit/modalita-edit.component';
import { ModalitaDeleteComponent } from './Componets/modalita-delete/modalita-delete.component';

@NgModule({
  declarations: [
    ModalitaListComponent,
    ModalitaCreateComponent,
    ModalitaEditComponent,
    ModalitaDeleteComponent,
    ModalitaComponent // Aggiungi il tuo ModalitaComponent qui
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule, // Import di RouterModule
    ModalitaRoutingModule, // Import del modulo di routing specifico
    ReactiveFormsModule
  ]
})
export class ModalitaModule { }
