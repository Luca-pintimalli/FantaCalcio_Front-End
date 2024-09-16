import { Component, OnInit } from '@angular/core';
import { ModalitaService } from './modalita.service';
import { iModalita } from './i-modalita';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modalita',
  templateUrl: './modalita.component.html'
})
export class ModalitaComponent implements OnInit {
  modalitaList: iModalita[] = [];

  constructor(private modalitaService: ModalitaService, private router: Router) {}

  ngOnInit(): void {
    this.loadModalita();
  }

  // Carica la lista delle modalità dal servizio
  loadModalita(): void {
    this.modalitaService.getAllModalita().subscribe(data => {
      this.modalitaList = data;
    });
  }

  // Naviga alla pagina di modifica per una modalità
  editModalita(id: number): void {
    this.router.navigate(['/modalita/edit', id]);
  }

  // Elimina una modalità con conferma
  deleteModalita(id: number): void {
    if (confirm('Sei sicuro di voler eliminare questa modalità?')) {
      this.modalitaService.deleteModalita(id).subscribe(() => {
        this.loadModalita();  // Ricarica la lista dopo l'eliminazione
      });
    }
  }

  // Naviga alla pagina di creazione di una nuova modalità
  createModalita(): void {
    this.router.navigate(['/modalita/create']);
  }
}
