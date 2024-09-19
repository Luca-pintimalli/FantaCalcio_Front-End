import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstaRoutingModule } from './asta-routing.module';
import { AstaComponent } from './asta.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DettagliAstaComponent } from './Components/dettagli-asta/dettagli-asta.component';

@NgModule({
  declarations: [
    AstaComponent,
    DettagliAstaComponent
  ],
  imports: [
    CommonModule,
    AstaRoutingModule,
    HttpClientModule,
    FormsModule,
    
  ]
})
export class AstaModule { }
