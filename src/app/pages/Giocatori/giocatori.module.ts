import { NgModule } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';

import { GiocatoriRoutingModule } from './giocatori-routing.module';
import { GiocatoreComponent } from './giocatori.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GiocatoriEditComponent } from './Components/giocatori-edit/giocatori-edit.component';
import { GiocatoriCreateComponent } from './Components/giocatori-create/giocatori-create.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    GiocatoreComponent,
    GiocatoriEditComponent,
    GiocatoriCreateComponent
  
  ],
  imports: [
    CommonModule,
    GiocatoriRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class GiocatoriModule { }
