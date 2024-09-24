import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FantacalcioRoutingModule } from './fantacalcio-routing.module';
import { FantacalcioComponent } from './fantacalcio.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AstaModule } from '../asta/asta.module';
import { OperazioniModule } from '../Operazioni/operazioni.module';
import { SquadraAstaComponent } from './squadra-asta/squadra-asta.component';

@NgModule({
  declarations: [
    FantacalcioComponent,
    SquadraAstaComponent
  ],
  imports: [
    CommonModule,
    FantacalcioRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AstaModule,
    OperazioniModule  // Importa il modulo Operazioni
  ]
})
export class FantacalcioModule { }
