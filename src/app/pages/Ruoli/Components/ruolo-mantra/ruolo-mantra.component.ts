import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Per ottenere l'ID del giocatore dalla route
import { iRuolo } from '../../i-ruolo';
import { RuoliService } from '../../ruoli.service';
import { RuoloMantraService } from '../../ruoloMantra/ruoli-mantra.service';
import { GiocatoriService } from '../../../Giocatori/giocatori.service';

@Component({
  selector: 'app-ruolo-mantra',
  templateUrl: './ruolo-mantra.component.html',
  styleUrls: ['./ruolo-mantra.component.scss']
})
export class RuoloMantraComponent implements OnInit {
  ruoli: iRuolo[] = [];  // Lista dei ruoli da caricare
  selectedRuoli: number[] = [];  // Ruoli selezionati
  errore: string | null = null;
  giocatore: any = { nome: '', cognome: '' };  // Informazioni del giocatore
  idGiocatore: number = 0;  // ID del giocatore ottenuto dalla route

  constructor(
    private ruoliService: RuoliService,  // Usa il RuoliService per caricare i ruoli
    private ruoloMantraService: RuoloMantraService,  // Servizio per RuoloMantra
    private giocatoreService: GiocatoriService,  // Servizio per i giocatori
    private route: ActivatedRoute  // Per ottenere l'ID dalla URL
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));  // Ottieni l'ID del giocatore dalla route
    this.idGiocatore = id;

    // Carica i dettagli del giocatore
    this.giocatoreService.getGiocatoreById(id).subscribe({
      next: (data) => {
        this.giocatore = data;  // Imposta il giocatore
      },
      error: (err) => {
        this.errore = 'Errore durante il caricamento del giocatore';
        console.error('Errore caricamento giocatore:', err);
      }
    });

    // Carica la lista dei ruoli
    this.loadRuoli();
  }

  // Carica i ruoli disponibili usando RuoliService
  loadRuoli(): void {
    this.ruoliService.getAllRuoli().subscribe({
      next: (data: iRuolo[]) => {
        this.ruoli = data;  // Assegna la lista dei ruoli
      },
      error: (err: any) => {
        this.errore = 'Errore nel caricamento dei ruoli';
        console.error('Errore nel caricamento dei ruoli:', err);
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
  }

  // Aggiungi un'associazione RuoloMantra al giocatore
  addRuoloMantra(): void {
    const ruoloMantraData = {
      idGiocatore: this.idGiocatore,  // Usa l'ID del giocatore
      ruoli: this.selectedRuoli  // Ruoli selezionati
    };

    this.ruoloMantraService.addRuoloMantra(ruoloMantraData).subscribe({
      next: (res: any) => {
        console.log('Associazione RuoloMantra aggiunta con successo');
      },
      error: (err: any) => {
        console.error('Errore durante l\'aggiunta dell\'associazione RuoloMantra:', err);
      }
    });
  }
}
