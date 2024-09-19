import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AstaService } from '../../asta.service';
import { ModalitaService } from '../../../modalita/modalita.service';
import { TipoAstaService } from '../../../tipo-asta/tipo-asta.service';
import { AuthService } from '../../../../auth/auth.service';
import { iModalita } from '../../../modalita/i-modalita';
import { iTipoAsta } from '../../../tipo-asta/i-tipo-asta';
import { iAsta } from '../../i-asta';

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
    iD_Utente: 0,
    iD_Modalita: 0,
    maxPortieri: 0,
    maxDifensori: 0,
    maxCentrocampisti: 0,
    maxAttaccanti: 0,
    iD_Asta: 0,
    nomeUtente: '',
    nomeModalita: '',
    tipoAstaDescrizione: ''
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
    const accessData = this.authService.getAccessData();
    if (accessData) {
      this.asta.iD_Utente = accessData.id; // Popola l'ID dell'utente
    }

    this.getModalita();
    this.getTipoAsta();
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

  creaAsta() {
    if (this.asta.iD_Utente > 0) {
      const selectedTipoAsta = this.tipoAstaList.find(tipo => tipo.iD_TipoAsta === this.asta.iD_TipoAsta);
      const selectedModalita = this.modalitaList.find(modalita => modalita.iD_Modalita === this.asta.iD_Modalita);

      this.asta.tipoAstaDescrizione = selectedTipoAsta ? selectedTipoAsta.nomeTipoAsta : '';
      this.asta.nomeModalita = selectedModalita ? selectedModalita.tipoModalita : '';

      this.astaService.createAsta(this.asta).subscribe({
        next: (response) => {
          console.log('Asta creata con successo:', response);
          this.router.navigate(['/asta']);
        },
        error: (error) => {
          console.error('Errore nella creazione dell\'asta', error);
        }
      });
    } else {
      console.error('ID utente non valido');
    }
  }
}
