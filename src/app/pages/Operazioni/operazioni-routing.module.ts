import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperazioniComponent } from './operazioni.component';
import { OperazioniCreateComponent } from './Components/operazioni-create/operazioni-create.component';
import { OperazioniEditComponent } from './Components/operazioni-edit/operazioni-edit.component';


const routes: Routes = [
  { path: '', component: OperazioniComponent },
  { path: 'operazione-create/:idAsta', component: OperazioniCreateComponent },  // Aggiungi l'ID dell'asta come parametro
  { path: 'edit/:id', component: OperazioniEditComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperazioniRoutingModule { }
