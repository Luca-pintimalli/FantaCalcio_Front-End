import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { iGiocatore } from '../../../Giocatori/i-giocatore';
import { iRuoloMantra } from '../../ruoloMantra/i-ruolo-mantra';
import { RuoliMantraService } from '../../ruoloMantra/ruoli-mantra.service';


@Component({
  selector: 'app-ruolo-mantra',
  templateUrl: './ruolo-mantra.component.html',
  styleUrls: ['./ruolo-mantra.component.scss']
})
export class RuoloMantraComponent implements OnInit {
  id_Giocatore!: number;  // ID del giocatore passato tramite queryParams
  ruoliMantra: iRuoloMantra[] = [];  // Lista delle associazioni RuoloMantra
  giocatori: iGiocatore[] = [];  // Lista dei giocatori

  constructor(
    private route: ActivatedRoute,
    private ruoliMantraService: RuoliMantraService
  ) {}

  ngOnInit(): void {
    // Ottenere l'ID del giocatore dai queryParams
    this.route.queryParams.subscribe(params => {
      this.id_Giocatore = +params['id_Giocatore'];
      console.log('ID Giocatore:', this.id_Giocatore);
      this.loadRuoliMantra();
    });
  }

  // Carica tutte le associazioni RuoloMantra
  loadRuoliMantra(): void {
    this.ruoliMantraService.getRuoliMantra().subscribe({
      next: (data) => {
        this.ruoliMantra = data;
      },
      error: (err) => console.error('Errore nel caricamento dei ruoli Mantra', err)
    });
  }

  // Metodo per ottenere il nome del giocatore tramite il suo ID
  getGiocatoreNome(idGiocatore: number): string {
    const giocatore = this.giocatori.find(g => g.iD_Giocatore === idGiocatore);
    return giocatore ? `${giocatore.nome} ${giocatore.cognome}` : 'Giocatore non trovato';
  }

  // Metodo per ottenere il nome del ruolo tramite l'ID del ruolo
  getRuoloNome(idRuolo: number): string {
    // Qui dovresti ottenere il nome del ruolo dal servizio o da un elenco di ruoli
    return 'Nome del Ruolo';  // Modifica questa parte in base alla tua logica
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
}
