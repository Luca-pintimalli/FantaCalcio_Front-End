import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { iModalita } from '../../i-modalita';  // Assicurati che l'interfaccia rifletta le proprietà restituite dall'API
import { ModalitaService } from '../../modalita.service';

@Component({
  selector: 'app-modalita-list',
  templateUrl: './modalita-list.component.html'
})
export class ModalitaListComponent implements OnInit {
  modalitaList: iModalita[] = [];

  constructor(private modalitaService: ModalitaService, private router: Router) {}

  ngOnInit(): void {
    // Utilizza direttamente i nomi delle proprietà come restituiti dall'API
    this.modalitaService.getAllModalita().subscribe(data => {
      this.modalitaList = data.map(modalita => ({
        iD_Modalita: modalita.iD_Modalita,   // Usa i nomi come forniti dall'API
        tipoModalita: modalita.tipoModalita  // Usa i nomi come forniti dall'API
      }));
    });
  }

  editModalita(id: number): void {
    this.router.navigate(['/modalita/edit', id]);
  }

  deleteModalita(id: number): void {
    this.modalitaService.deleteModalita(id).subscribe(() => {
      this.modalitaList = this.modalitaList.filter(m => m.iD_Modalita !== id);
    });
  }

  addModalita(): void {
    this.router.navigate(['/modalita/create']);
  }
}
