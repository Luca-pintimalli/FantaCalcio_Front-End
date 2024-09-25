import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OperazioniService } from './operazioni.service';
import { forkJoin } from 'rxjs';
import { GiocatoriService } from '../Giocatori/giocatori.service';
import { SquadraService } from '../squadra/squadra.service';

@Component({
  selector: 'app-operazioni',
  templateUrl: './operazioni.component.html',
  styleUrls: ['./operazioni.component.scss']
})
export class OperazioniComponent implements OnInit {
  operazioni: any[] = [];
  messaggioErrore: string = '';

  constructor(
    private operazioniService: OperazioniService,
    private giocatoriService: GiocatoriService,
    private squadreService: SquadraService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadOperazioni();
  }

  loadOperazioni(): void {
    this.operazioniService.getOperazioni().subscribe(
      (data: any[]) => {
        const operazioniConDettagli = data.map((operazione) => {
          // Usare forkJoin per recuperare sia il giocatore che la squadra dai servizi separati
          return forkJoin({
            giocatore: this.giocatoriService.getGiocatoreById(operazione.iD_Giocatore),
            squadra: this.squadreService.getSquadraById(operazione.iD_Squadra)
          }).toPromise().then((dettagli) => {
            if (dettagli && dettagli.giocatore && dettagli.squadra) {
              // Aggiungere i dettagli del giocatore e della squadra all'operazione
              operazione.giocatoreCognome = dettagli.giocatore.cognome || 'Cognome non disponibile';
              operazione.squadraNome = dettagli.squadra.nome || 'Nome squadra non disponibile';
            } else {
              console.warn('Dettagli non trovati per operazione:', operazione);
              operazione.giocatoreCognome = 'Dettagli non disponibili';
              operazione.squadraNome = 'Dettagli non disponibili';
            }
            return operazione;
          }).catch(error => {
            console.error('Errore nel recupero dei dettagli:', error);
            operazione.giocatoreCognome = 'Errore nel recupero del cognome';
            operazione.squadraNome = 'Errore nel recupero del nome squadra';
            return operazione;
          });
        });

        // Risolvere tutte le promesse per ottenere i dettagli di tutte le operazioni
        Promise.all(operazioniConDettagli).then((operazioniComplete) => {
          this.operazioni = operazioniComplete;
        });
      },
      (error) => {
        this.messaggioErrore = 'Errore nel caricamento delle operazioni';
        console.error(error);
      }
    );
  }

  navigateToCreate(): void {
    this.router.navigate(['/operazioni/operazione-create']);
  }

  navigateToEdit(id: number): void {
    this.router.navigate(['/operazioni/edit', id]);
  }

  deleteOperazione(idOperazione: number, idSquadra: number, creditiSpesi: number): void {
    if (confirm('Sei sicuro di voler eliminare questa operazione?')) {
      this.operazioniService.deleteOperazione(idOperazione, idSquadra, creditiSpesi).subscribe(
        () => {
          console.log('Operazione eliminata con successo');
          this.loadOperazioni(); // Ricarica l'elenco delle operazioni
        },
        (error) => {
          this.messaggioErrore = 'Errore durante l\'eliminazione dell\'operazione';
          console.error('Errore durante l\'eliminazione dell\'operazione', error);
        }
      );
    }
  }
}
