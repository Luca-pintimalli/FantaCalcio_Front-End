import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { iAsta } from '../../i-asta';
import { iTipoAsta } from '../../../tipo-asta/i-tipo-asta';
import { iModalita } from '../../../modalita/i-modalita';
import { AstaService } from '../../asta.service';
import { ModalitaService } from '../../../modalita/modalita.service';
import { TipoAstaService } from '../../../tipo-asta/tipo-asta.service';
import { AuthService } from '../../../../auth/auth.service';
import { iAstaCreate } from '../../i-asta-create';

@Component({
  selector: 'app-asta-create',
  templateUrl: './asta-create.component.html',
  styleUrls: ['./asta-create.component.scss']
})
export class AstaCreateComponent implements OnInit {
  asta: iAsta = {
    iD_TipoAsta: 0,
    numeroSquadre: 0,
    creditiDisponibili: 0,
    iD_Utente: 0,  // Questo sarà aggiornato con l'utente loggato
    iD_Modalita: 0,
    maxPortieri: 0,
    maxDifensori: 0,
    maxCentrocampisti: 0,
    maxAttaccanti: 0,
    iD_Asta: 0  // Viene generato dal server
  };

  modalitaList: iModalita[] = [];
  tipoAstaList: iTipoAsta[] = [];

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

    // Ottenere l'utente loggato
    const currentUser = this.authService.getUser();
    if (currentUser) {
      this.asta.iD_Utente = currentUser.id;
    } else {
      console.error('Errore: Nessun utente loggato trovato.');
    }
  }

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
  creaAsta(): void {
    // Conversione di ID_TipoAsta e ID_Modalita in numeri
    this.asta.iD_TipoAsta = +this.asta.iD_TipoAsta;
    this.asta.iD_Modalita = +this.asta.iD_Modalita;
  
    // Usa l'interfaccia iAstaCreate per inviare i dati corretti al server
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
  
    // Chiamata al servizio per creare l'asta
    this.astaService.createAsta(astaData).subscribe({
      next: (response) => {
        console.log('Asta creata con successo');
        this.router.navigate(['/Asta']);
      },
      error: (error) => {
        console.error('Errore nella creazione dell\'asta', error.message || error);
      }
    });
  }
  
  
  
  
}
