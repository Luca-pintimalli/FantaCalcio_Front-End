import { ChangeDetectorRef, Component, Input, OnInit, OnDestroy } from '@angular/core';
import { iSquadra } from '../../squadra/i-squadra';
import { iOperazione } from '../../Operazioni/i-operazione';
import { SquadraService } from '../../squadra/squadra.service';
import { OperazioniService } from '../../Operazioni/operazioni.service';
import { GiocatoriService } from '../../Giocatori/giocatori.service';
import { iGiocatore } from '../../Giocatori/i-giocatore';
import { Subscription } from 'rxjs';
import { FantacalcioService } from '../../fantacalcio/fantacalcio.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-squadra-asta',
  templateUrl: './squadra-asta.component.html',
  styleUrls: ['./squadra-asta.component.scss']
})
export class SquadraAstaComponent implements OnInit, OnDestroy {
  @Input() idAstaCorrente!: number;
  squadre: iSquadra[] = [];
  operazioniSquadra: { [key: number]: { operazione: iOperazione, giocatore: iGiocatore }[] } = {};
  squadraCorrente!: iSquadra;  // Squadra che verrà modificata
  selectedFile!: File;
  selectedFiles: { [key: number]: File } = {};
  previewUrl: string | ArrayBuffer | null = null;  

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
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal  // Aggiungi qui il servizio

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


  openModal(squadra: iSquadra, content: any): void {
    this.squadraCorrente = { ...squadra };  // Crea una copia dell'oggetto squadra
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
onFileSelected(event: any): void {
  const file = event.target.files[0];
  if (file) {
    this.selectedFile = file;

    // Genera un'anteprima dell'immagine
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.previewUrl = e.target.result;  // Salva l'anteprima dell'immagine
    };
    reader.readAsDataURL(file);
  }
}

  
  
  
aggiornaSquadra(modal: any): void {
  const formData = new FormData();
  formData.append('nome', this.squadraCorrente.nome);

  const creditiTotali = this.squadraCorrente?.creditiTotali ?? 0;
  const creditiSpesi = this.squadraCorrente?.creditiSpesi ?? 0;

  formData.append('creditiTotali', creditiTotali.toString());
  formData.append('creditiSpesi', creditiSpesi.toString());

  if (this.selectedFile) {
    formData.append('stemma', this.selectedFile);
  }

  this.squadraService.updateSquadra(this.squadraCorrente.iD_Squadra, formData).subscribe({
    next: () => {
      modal.close();  // Chiudi il modale
      this.refreshSquadre();  // Ricarica tutte le squadre con i dati aggiornati
    },
    error: (error) => {
      console.error('Errore durante l\'aggiornamento della squadra', error);
    }
  });
}

  


refreshSquadre(): void {
  this.squadraService.getSquadreByAsta(this.idAstaCorrente).subscribe({
    next: (squadre: iSquadra[]) => {
      this.squadre = squadre;  // Aggiorna la lista delle squadre
      this.cdr.detectChanges();  // Forza il rilevamento dei cambiamenti
    },
    error: (error: any) => {
      console.error('Errore durante il recupero delle squadre', error);
    }
  });
}


}