import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AstaComponent } from './asta.component';
import { DettagliAstaComponent } from './Components/dettagli-asta/dettagli-asta.component';
import { AstaCreateComponent } from './Components/asta-create/asta-create.component';

const routes: Routes = [
  { path: '', component: AstaComponent },
  { path: 'dettagli/:id', component: DettagliAstaComponent },
  { path: 'create', component: AstaCreateComponent }  // Nuova rotta per la creazione dell'asta
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AstaRoutingModule { }
