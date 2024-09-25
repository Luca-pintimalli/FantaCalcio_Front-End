import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegolamentoComponent } from './regolamento.component';

const routes: Routes = [{ path: '', component: RegolamentoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegolamentoRoutingModule { }
