import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AstaComponent } from './asta.component';
import { DettagliAstaComponent } from './Components/dettagli-asta/dettagli-asta.component';

const routes: Routes = [
  { path: '', component: AstaComponent }, // Lista di tutte le aste
  { path: 'dettagli/:id', component: DettagliAstaComponent } // Rotta per i dettagli dell'asta
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AstaRoutingModule { }
