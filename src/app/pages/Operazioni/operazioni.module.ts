import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperazioniRoutingModule } from './operazioni-routing.module';
import { OperazioniComponent } from './operazioni.component';
import { OperazioniCreateComponent } from './Components/operazioni-create/operazioni-create.component';  // Aggiungi qui
import { OperazioniEditComponent } from './Components/operazioni-edit/operazioni-edit.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    OperazioniComponent,
    OperazioniCreateComponent,  // Dichiara OperazioniCreateComponent qui
    OperazioniEditComponent
  ],
  imports: [
    CommonModule,
    OperazioniRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbAlertModule
  ],
  exports: [
    OperazioniCreateComponent  // Esporta il componente per renderlo disponibile in altri moduli
  ]
})
export class OperazioniModule { }
