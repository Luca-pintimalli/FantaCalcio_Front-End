import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GiocatoriRoutingModule } from './giocatori-routing.module';
import { GiocatoreComponent } from './giocatori.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    GiocatoreComponent,
  
  ],
  imports: [
    CommonModule,
    GiocatoriRoutingModule,
    FormsModule,
    HttpClientModule
  ]
})
export class GiocatoriModule { }
