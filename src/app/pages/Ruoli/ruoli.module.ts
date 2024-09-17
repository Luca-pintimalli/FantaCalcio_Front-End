import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RuoliRoutingModule } from './ruoli-routing.module';
import { RuoliComponent } from './ruoli.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RuoliCreateComponent } from './Components/ruoli-create/ruoli-create.component';
import { RuoliEditComponent } from './Components/ruoli-edit/ruoli-edit.component';
import { RuoloMantraComponent } from './Components/ruolo-mantra/ruolo-mantra.component';

@NgModule({
  declarations: [
    RuoliComponent,  // Dichiarato solo una volta
    RuoliCreateComponent,  // Componente per la creazione di un nuovo ruolo
    RuoliEditComponent,
    RuoloMantraComponent     // Componente per la modifica di un ruolo esistente
  ],
  imports: [
    CommonModule,
    RuoliRoutingModule,
    FormsModule,          // Aggiungi FormsModule se utilizzi moduli template-driven
    ReactiveFormsModule   // Aggiungi ReactiveFormsModule se utilizzi moduli reattivi
  ]
})
export class RuoliModule { }
