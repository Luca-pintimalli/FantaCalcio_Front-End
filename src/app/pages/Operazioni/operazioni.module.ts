import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperazioniRoutingModule } from './operazioni-routing.module';
import { OperazioniComponent } from './operazioni.component';
import { HttpClientModule } from '@angular/common/http';
import { OperazioniCreateComponent } from './Components/operazioni-create/operazioni-create.component';
import { FormsModule } from '@angular/forms';
import { OperazioniEditComponent } from './Components/operazioni-edit/operazioni-edit.component';


@NgModule({
  declarations: [
    OperazioniComponent,
    OperazioniCreateComponent,
    OperazioniEditComponent
  ],
  imports: [
    CommonModule,
    OperazioniRoutingModule,
    HttpClientModule,
    FormsModule
  ]
})
export class OperazioniModule { }
