import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GiocatoriRoutingModule } from './giocatori-routing.module';
import { GiocatoriComponent } from './giocatori.component';
import { ListaComponent } from './Components/lista/lista.component';
import { DettagliComponent } from './Components/dettagli/dettagli.component';
import { AggiungiComponent } from './Components/aggiungi/aggiungi.component';
import { ModificaComponent } from './Components/modifica/modifica.component';
import {  HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    GiocatoriComponent,
    ListaComponent,
    DettagliComponent,
    AggiungiComponent,
    ModificaComponent
  ],
  imports: [
    CommonModule,
    GiocatoriRoutingModule,
    FormsModule,
    HttpClientModule
  ]
})
export class GiocatoriModule { }
