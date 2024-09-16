import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RuoliRoutingModule } from './ruoli-routing.module';
import { RuoliComponent } from './ruoli.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RuoliComponent,
    RuoliComponent,  // Componente per la creazione di un nuovo ruolo
    RuoliComponent     // Componente per la modifica di un ruolo esistente
  ],
  imports: [
    CommonModule,
    RuoliRoutingModule,
    FormsModule,          // Aggiungi FormsModule se utilizzi moduli template-driven
    ReactiveFormsModule   // Aggiungi ReactiveFormsModule se utilizzi moduli reattivi
  ]
})
export class RuoliModule { }
