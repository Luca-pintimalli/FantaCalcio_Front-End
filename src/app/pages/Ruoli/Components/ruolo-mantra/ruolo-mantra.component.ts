import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Per ottenere l'ID del giocatore dalla route
import { iRuolo } from '../../i-ruolo';
import { RuoliService } from '../../ruoli.service';
import { RuoloMantraService } from '../../ruoloMantra/ruoli-mantra.service';
import { GiocatoriService } from '../../../Giocatori/giocatori.service';
import { iGiocatore } from '../../../Giocatori/i-giocatore'; // Aggiungere l'interfaccia del giocatore
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-ruolo-mantra',
  templateUrl: './ruolo-mantra.component.html',
  styleUrls: ['./ruolo-mantra.component.scss']
})
export class RuoloMantraComponent implements OnInit {
  ruoli: iRuolo[] = [];  // Lista dei ruoli da caricare
  selectedRuoli: number[] = [];  // Ruoli selezionati
  errore: string | null = null;
  giocatore: iGiocatore | null = null;  // Tipo corretto del giocatore
  iD_Giocatore: number = 0;  // ID del giocatore ottenuto dalla route, coerente con l'interfaccia
  successMessage: string | null = null;  // Messaggio di successo

  constructor(
    private router: Router,
    private ruoliService: RuoliService,  // Usa il RuoliService per caricare i ruoli
    private ruoloMantraService: RuoloMantraService,  // Servizio per RuoloMantra
    private giocatoreService: GiocatoriService,  // Servizio per i giocatori
    private route: ActivatedRoute  // Per ottenere l'ID dalla URL
  ) {}
  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.iD_Giocatore = Number(idParam);
  
    if (this.iD_Giocatore && this.iD_Giocatore > 0) {
      this.caricaGiocatore();
      this.loadRuoli();
    } else {
      this.errore = 'ID giocatore non valido';
      console.error('ID giocatore non valido:', this.iD_Giocatore);
    }
  }
  
  
  // Metodo per caricare i dettagli del giocatore
  caricaGiocatore(): void {
    this.giocatoreService.getGiocatoreById(this.iD_Giocatore).subscribe({
      next: (data) => {
        this.giocatore = data;
        console.log('Giocatore caricato:', this.giocatore);
      },
      error: (err) => {
        this.errore = 'Errore durante il caricamento del giocatore';
        console.error('Errore caricamento giocatore:', err);
      }
    });
  }

  // Carica i ruoli disponibili usando RuoliService
  loadRuoli(): void {
    this.ruoliService.getAllRuoli().subscribe({
      next: (data: iRuolo[]) => {
        this.ruoli = data;
        console.log('Ruoli caricati:', data);
      },
      error: (err: any) => {
        console.error('Errore nel caricamento dei ruoli:', err);
        this.errore = 'Errore nel caricamento dei ruoli';
      }
    });
  }

  // Gestisci la selezione dei ruoli
  onRuoloSelected(idRuolo: number, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const isChecked = inputElement.checked;

    if (isChecked) {
      this.selectedRuoli.push(idRuolo);  // Aggiungi il ruolo selezionato
    } else {
      this.selectedRuoli = this.selectedRuoli.filter(ruolo => ruolo !== idRuolo);  // Rimuovi il ruolo deselezionato
    }
    console.log('Ruoli selezionati:', this.selectedRuoli);
  }

  // Aggiungi un'associazione RuoloMantra al giocatore
  addRuoloMantra(): void {
    if (this.iD_Giocatore && this.selectedRuoli.length > 0) {
      const ruoloId = this.selectedRuoli[0];  // Prendi un ruolo selezionato (esempio)

      const ruoloMantraData = {
        ID: 0,
        ID_Giocatore: this.iD_Giocatore,
        NomeGiocatore: this.giocatore?.nome,
        ID_Ruolo: ruoloId,
        NomeRuolo: this.ruoli.find(ruolo => ruolo.iD_Ruolo === ruoloId)?.nomeRuolo
      };

      console.log('Dati inviati per RuoloMantra:', ruoloMantraData);

      // Reset messaggi precedenti
      this.errore = null;
      this.successMessage = null;

      this.ruoloMantraService.addRuoloMantra(ruoloMantraData).subscribe({
        next: (res: any) => {
          this.successMessage = 'Ruolo Mantra assegnato con successo!';  // Mostra messaggio di successo
          console.log('Associazione RuoloMantra aggiunta con successo');
        },
        error: (err: any) => {
          this.errore = 'Errore durante l\'aggiunta dell\'associazione RuoloMantra';  // Mostra messaggio di errore
          console.error('Errore durante l\'aggiunta dell\'associazione RuoloMantra', err);
        }
      });
    } else {
      this.errore = 'ID giocatore o ruoli selezionati non validi';  // Mostra messaggio di errore
      console.error('Errore: ID giocatore o ruoli selezionati non validi');
    }
  }

  tornaAiGiocatori(): void {
    this.router.navigate(['/giocatori']); 
}
}