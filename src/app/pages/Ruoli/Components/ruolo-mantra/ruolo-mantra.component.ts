import { Component, OnInit } from '@angular/core';
import { iGiocatore } from '../../../Giocatori/i-giocatore';
import { iRuoloMantra } from '../../ruoloMantra/i-ruolo-mantra';
import { RuoliMantraService } from '../../ruoloMantra/ruoli-mantra.service';
import { GiocatoriService } from '../../../Giocatori/giocatori.service';

@Component({
  selector: 'app-ruolo-mantra',
  templateUrl: './ruolo-mantra.component.html',
  styleUrls: ['./ruolo-mantra.component.scss']  // Corretto qui: styleUrls con "s"
})
export class RuoloMantraComponent implements OnInit {
  giocatori: iGiocatore[] = [];  // Lista di giocatori
  ruoliMantra: iRuoloMantra[] = [];  // Associazioni RuoloMantra

  constructor(
    private ruoliMantraService: RuoliMantraService, // Servizio per RuoloMantra
    private giocatoriService: GiocatoriService  // Servizio per i giocatori
  ) {}

  ngOnInit(): void {
    this.loadGiocatori();  // Carica i giocatori
    this.loadRuoliMantra();  // Carica le associazioni RuoloMantra
  }

  // Carica tutti i giocatori
  loadGiocatori(): void {
    this.giocatoriService.getAllGiocatori().subscribe({
      next: (data) => {
        this.giocatori = data;  // Popola la lista dei giocatori
      },
      error: (err) => console.error('Errore nel caricamento dei giocatori', err)
    });
  }

  // Carica tutte le associazioni RuoloMantra
  loadRuoliMantra(): void {
    this.ruoliMantraService.getRuoliMantra().subscribe({
      next: (data) => {
        this.ruoliMantra = data;  // Popola la lista delle associazioni RuoloMantra
      },
      error: (err) => console.error('Errore nel caricamento dei ruoli Mantra', err)
    });
  }

  // Elimina un'associazione RuoloMantra
  deleteRuoloMantra(id: number): void {
    this.ruoliMantraService.deleteRuoloMantra(id).subscribe({
      next: () => {
        this.ruoliMantra = this.ruoliMantra.filter(rm => rm.id !== id);  // Rimuove l'associazione dalla lista
        console.log('Associazione RuoloMantra eliminata');
      },
      error: (err) => console.error('Errore durante l\'eliminazione del ruolo Mantra', err)
    });
  }

  // Metodo per ottenere il nome del giocatore tramite il suo ID
  getGiocatoreNome(idGiocatore: number): string {
    const giocatore = this.giocatori.find(g => g.iD_Giocatore === idGiocatore);
    return giocatore ? `${giocatore.nome} ${giocatore.cognome}` : 'Giocatore non trovato';
  }

  // Metodo per ottenere il nome del ruolo tramite l'ID del ruolo (questo dipende da come gestisci i ruoli)
  getRuoloNome(idRuolo: number): string {
    // Dovresti aggiungere la logica per ottenere il nome del ruolo
    return 'Nome del Ruolo';  // Modifica questo in base alla tua logica di ruoli
  }
}
