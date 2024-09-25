import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { iModalita } from '../pages/modalita/i-modalita';
import { iTipoAsta } from '../pages/tipo-asta/i-tipo-asta';
import { iAsta } from '../pages/asta/i-asta';
import { AuthService } from '../auth/auth.service';
import { ModalitaService } from '../pages/modalita/modalita.service';
import { TipoAstaService } from '../pages/tipo-asta/tipo-asta.service';
import { Router } from '@angular/router';
import { AstaService } from '../pages/asta/asta.service';
import { iAstaCreate } from '../pages/asta/i-asta-create';

@Component({
  selector: 'app-asta-impostazioni',
  templateUrl: './asta-impostazioni.component.html',
  styleUrls: ['./asta-impostazioni.component.scss']
})
export class AstaImpostazioniComponent implements OnInit {
  @Output() impostazioniComplete = new EventEmitter<number>();  // Output per l'ID dell'asta

  asta: iAsta = {
    iD_TipoAsta: 0,
    numeroSquadre: 0,
    creditiDisponibili: 0,
    iD_Utente: 0,
    iD_Modalita: 0,
    maxPortieri: 0,
    maxDifensori: 0,
    maxCentrocampisti: 0,
    maxAttaccanti: 0,
    iD_Asta: 0
  };

  modalitaList: iModalita[] = [];
  tipoAstaList: iTipoAsta[] = [];
  
  selectedModalita: iModalita | null = null;
  selectedTipoAsta: iTipoAsta | null = null;

  constructor(
    private astaService: AstaService,
    private router: Router,
    private modalitaService: ModalitaService,
    private tipoAstaService: TipoAstaService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getModalita();
    this.getTipoAsta();

    const currentUser = this.authService.getUser();
    if (currentUser) {
      this.asta.iD_Utente = currentUser.id;
    } else {
      console.error('Errore: Nessun utente loggato trovato.');
    }
  }

  // Recupera la lista delle modalità
  getModalita(): void {
    this.modalitaService.getAllModalita().subscribe({
      next: (response) => {
        this.modalitaList = response;
      },
      error: (error) => {
        console.error('Errore nel recupero delle modalità', error);
      }
    });
  }

  // Recupera la lista dei tipi di asta
  getTipoAsta(): void {
    this.tipoAstaService.getAllTipoAsta().subscribe({
      next: (response) => {
        this.tipoAstaList = response;
      },
      error: (error) => {
        console.error('Errore nel recupero dei tipi di asta', error);
      }
    });
  }

  // Funzione per creare un'asta
  creaAsta(): void {
    const astaData: iAstaCreate = {
      iD_TipoAsta: this.asta.iD_TipoAsta,
      numeroSquadre: this.asta.numeroSquadre,
      creditiDisponibili: this.asta.creditiDisponibili,
      iD_Modalita: this.asta.iD_Modalita,
      maxPortieri: this.asta.maxPortieri,
      maxDifensori: this.asta.maxDifensori,
      maxCentrocampisti: this.asta.maxCentrocampisti,
      maxAttaccanti: this.asta.maxAttaccanti
    };

    // Creazione dell'asta
    this.astaService.createAsta(astaData).subscribe({
      next: (response: iAsta) => {
        if (response && response.iD_Asta) {
          console.log('Asta creata con ID:', response.iD_Asta);
          // Emetti l'evento al componente genitore con l'ID dell'asta
          this.impostazioniComplete.emit(response.iD_Asta);
        } else {
          console.error('Errore: Nessun ID Asta restituito');
        }
      },
      error: (error) => {
        console.error('Errore nella creazione dell\'asta', error.message || error);
      }
    });
  }
}
