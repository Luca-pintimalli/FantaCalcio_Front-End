import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstaRoutingModule } from './asta-routing.module';
import { AstaComponent } from './asta.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { DettagliAstaComponent } from './Components/dettagli-asta/dettagli-asta.component';
import { AstaUpdateComponent } from './Components/asta-update/asta-update.component'; 
import { AstaImpostazioniComponent } from '../../asta-impostazioni/asta-impostazioni.component';

@NgModule({
  declarations: [
    AstaComponent,
    DettagliAstaComponent,
    AstaUpdateComponent ,
    AstaImpostazioniComponent
  ],
  imports: [
    CommonModule,
    AstaRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule 
  ],
  exports:[
    AstaImpostazioniComponent
  ]
})
export class AstaModule { }
