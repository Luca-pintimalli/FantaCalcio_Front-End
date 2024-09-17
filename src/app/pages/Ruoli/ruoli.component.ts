import { Component, OnInit } from '@angular/core';
import { iRuolo } from './i-ruolo';
import { iModalita } from '../modalita/i-modalita';  // Import dell'interfaccia iModalita
import { Router } from '@angular/router';
import { RuoliService } from './ruoli.service';
import { ModalitaService } from '../modalita/modalita.service';  // Import del servizio ModalitaService

@Component({
  selector: 'app-ruoli',
  templateUrl: './ruoli.component.html'
})
export class RuoliComponent implements OnInit {
  ruoloList: iRuolo[] = [];
  modalitaList: iModalita[] = [];  // Dichiarazione di modalitaList come array di iModalita

  constructor(
    private ruoloService: RuoliService,
    private modalitaService: ModalitaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadRuoli();
    this.loadModalita();  // Carica le modalità al caricamento del componente
  }

  // Carica la lista dei ruoli dal servizio
  loadRuoli(): void {
    this.ruoloService.getAllRuoli().subscribe(data => {
      this.ruoloList = data;
    });
  }

  // Carica la lista delle modalità dal servizio
  loadModalita(): void {
    this.modalitaService.getAllModalita().subscribe(data => {
      this.modalitaList = data;
    });
  }

  // Ottiene il tipoModalita in base all'ID della modalità
  getTipoModalita(iD_Modalita: number): string {
    const modalita = this.modalitaList.find(m => m.iD_Modalita === iD_Modalita);
    return modalita ? modalita.tipoModalita : 'N/D';  // Ritorna N/D se la modalità non viene trovata
  }

  // Naviga alla pagina di modifica per un ruolo
  editRuolo(id: number): void {
    this.router.navigate(['/ruoli/edit', id]);
  }

  // Elimina un ruolo con conferma
  deleteRuolo(id: number): void {
    if (confirm('Sei sicuro di voler eliminare questo ruolo?')) {
      this.ruoloService.deleteRuolo(id).subscribe(() => {
        this.loadRuoli();  // Ricarica la lista dei ruoli dopo l'eliminazione
      });
    }
  }

  // Naviga alla pagina di creazione di un nuovo ruolo
  createRuolo(): void {
    this.router.navigate(['/ruoli/create']);
  }


  // Metodo per navigare alla pagina dei calciatori
  goToGiocatoriList(): void {
    this.router.navigate(['/giocatori']);  // Naviga alla lista dei calciatori
  }

}
