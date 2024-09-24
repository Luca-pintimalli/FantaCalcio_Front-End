import { ChangeDetectorRef, Component, Input, OnInit, OnDestroy } from '@angular/core';
import { iSquadra } from '../../squadra/i-squadra';
import { iOperazione } from '../../Operazioni/i-operazione';
import { SquadraService } from '../../squadra/squadra.service';
import { OperazioniService } from '../../Operazioni/operazioni.service';
import { GiocatoriService } from '../../Giocatori/giocatori.service';
import { iGiocatore } from '../../Giocatori/i-giocatore';
import { Subscription } from 'rxjs';
import { FantacalcioService } from '../../fantacalcio/fantacalcio.service';

@Component({
  selector: 'app-squadra-asta',
  templateUrl: './squadra-asta.component.html',
  styleUrls: ['./squadra-asta.component.scss']
})
export class SquadraAstaComponent implements OnInit, OnDestroy {
  @Input() idAstaCorrente!: number;
  squadre: iSquadra[] = [];
  operazioniSquadra: { [key: number]: { operazione: iOperazione, giocatore: iGiocatore }[] } = {};

  ruoloOrdine: { [key: string]: number } = {
    'Portiere': 1,
    'Difensore': 2,
    'Centrocampista': 3,
    'Attaccante': 4
  };

  private operazioneCreataSub: Subscription = new Subscription();  // Inizializzazione vuota

  constructor(
    private squadraService: SquadraService,
    private operazioniService: OperazioniService,
    private giocatoriService: GiocatoriService,
    private fantacalcioService: FantacalcioService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (this.idAstaCorrente) {
      this.squadraService.getSquadreByAsta(this.idAstaCorrente).subscribe({
        next: (squadre: iSquadra[]) => {
          this.squadre = squadre;
          this.caricaOperazioni();

          // Iscriviti allo stream delle operazioni create
          this.operazioneCreataSub = this.fantacalcioService.operazioneCreata$.subscribe((operazione: iOperazione) => {
            console.log('Nuova operazione creata:', operazione);
            this.caricaOperazioni();  // Ricarica le operazioni e aggiorna la visualizzazione
            this.cdr.detectChanges();  // Forza il rilevamento dei cambiamenti
          });
        },
        error: (error: any) => {
          console.error('Errore durante il recupero delle squadre', error);
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.operazioneCreataSub) {
      this.operazioneCreataSub.unsubscribe();
    }
  }

  caricaOperazioni(): void {
    this.operazioniService.getOperazioniByAsta(this.idAstaCorrente).subscribe({
      next: (operazioni: iOperazione[]) => {
        this.squadraService.getSquadreByAsta(this.idAstaCorrente).subscribe({
          next: (squadre: iSquadra[]) => {
            this.squadre = squadre;  // Ricarica le squadre aggiornate dal backend
            
            this.squadre.forEach(squadra => {
              this.operazioniSquadra[squadra.iD_Squadra] = [];
  
              operazioni
                .filter(operazione => operazione.iD_Squadra === squadra.iD_Squadra)
                .forEach(operazione => {
                  this.giocatoriService.getGiocatoreById(operazione.iD_Giocatore).subscribe({
                    next: (giocatore: iGiocatore) => {
                      this.operazioniSquadra[squadra.iD_Squadra].push({ operazione, giocatore });
  
                      // Ordina le operazioni in base al ruolo
                      this.operazioniSquadra[squadra.iD_Squadra].sort((a, b) => {
                        const ruoloA = a.giocatore.ruoloClassic;
                        const ruoloB = b.giocatore.ruoloClassic;
                        return this.ruoloOrdine[ruoloA] - this.ruoloOrdine[ruoloB];
                      });
  
                      // Forza il rilevamento dei cambiamenti
                      this.cdr.detectChanges();
                    },
                    error: (error: any) => {
                      console.error('Errore durante il caricamento del giocatore', error);
                    }
                  });
                });
            });
          },
          error: (error: any) => {
            console.error('Errore durante il caricamento delle squadre', error);
          }
        });
      },
      error: (error: any) => {
        console.error('Errore durante il caricamento delle operazioni', error);
      }
    });
  }
  
  
  loadOperazioniForSquadra(squadra: iSquadra): void {
    this.operazioniSquadra[squadra.iD_Squadra] = [];

    this.operazioniService.getOperazioniByAsta(squadra.iD_Squadra).subscribe({
      next: (operazioni: iOperazione[]) => {
        operazioni.forEach(operazione => {
          this.giocatoriService.getGiocatoreById(operazione.iD_Giocatore).subscribe({
            next: (giocatore: iGiocatore) => {
              this.operazioniSquadra[squadra.iD_Squadra].push({ operazione, giocatore });
            },
            error: (error) => {
              console.error('Errore durante il caricamento del giocatore', error);
            }
          });
        });
      },
      error: (error) => {
        console.error('Errore durante il caricamento delle operazioni', error);
      }
    });
  }
}
