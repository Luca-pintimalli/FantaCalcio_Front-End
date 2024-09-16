import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModalitaComponent } from './modalita.component';
import { ModalitaListComponent } from './Componets/modalita-list/modalita-list.component';
import { ModalitaCreateComponent } from './Componets/modalita-create/modalita-create.component';
import { ModalitaEditComponent } from './Componets/modalita-edit/modalita-edit.component';
import { ModalitaDeleteComponent } from './Componets/modalita-delete/modalita-delete.component';

const routes: Routes = [
  {
    path: '', component: ModalitaComponent, children: [
      { path: 'list', component: ModalitaListComponent },
      { path: 'create', component: ModalitaCreateComponent },
      { path: 'edit/:id', component: ModalitaEditComponent },
      { path: 'delete/:id', component: ModalitaDeleteComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModalitaRoutingModule { }
