import { Component, Input, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { iOperazione } from '../../i-operazione';
import { iGiocatore } from '../../../Giocatori/i-giocatore';
import { iSquadra } from '../../../squadra/i-squadra';
import { SquadraService } from '../../../squadra/squadra.service';
import { OperazioniService } from '../../operazioni.service';
import { GiocatoriService } from '../../../Giocatori/giocatori.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FantacalcioService } from '../../../fantacalcio/fantacalcio.service';
import { AstaService } from '../../../asta/asta.service';
import { iAsta } from '../../../asta/i-asta';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-operazioni-create',
  templateUrl: './operazioni-create.component.html',
  styleUrls: ['./operazioni-create.component.scss']
})
export class OperazioniCreateComponent implements OnInit, OnDestroy {
  @Input() idAsta: number | null = null;

  operazione: iOperazione = {
    iD_Operazione: 0,
    iD_Giocatore: 0,
    iD_Squadra: 0,
    creditiSpesi: 0,
    dataOperazione: new Date(),
    statoOperazione: '',
    iD_Asta: 0
  };

  mostraMessaggioErrore = false;
  mostraGiocatoreRandomizzato = false;
  mostraMessaggioSuccesso = false;
  giocatoriFiltrati: iGiocatore[] = [];
  giocatori: iGiocatore[] = [];
  squadre: iSquadra[] = [];
  giocatoreSelezionato: iGiocatore | null = null;
  tipoAstaRandom: boolean = true;
  searchText: string = '';
  erroreAssegnazione: boolean = false;
  messaggioErrore: string = '';
  idAstaCorrente: number = 0;

  constructor(
    private operazioniService: OperazioniService,
    private giocatoriService: GiocatoriService,
    private squadraService: SquadraService,
    private astaService: AstaService,
    private fantacalcioService: FantacalcioService,  // Usa il servizio centralizzato
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef  // Aggiungi ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (this.idAsta) {
      this.idAstaCorrente = this.idAsta;
      this.operazione.iD_Asta = this.idAstaCorrente;
      this.getSquadreByAsta();

      // Recupera informazioni dell'asta e tipo di asta
      this.astaService.getAstaById(this.idAstaCorrente).subscribe({
        next: (asta: iAsta) => {
          this.tipoAstaRandom = asta.iD_TipoAsta === 2;
          if (!this.tipoAstaRandom) {
            this.getGiocatoriDisponibili();
          }
        },
        error: (error: any) => {
          console.error('Errore durante il recupero delle informazioni dell\'asta', error);
          this.messaggioErrore = 'Errore durante il recupero delle informazioni dell\'asta';
        }
      });
    } else {
      console.error('ID Asta non valido o NaN.');
      this.messaggioErrore = 'ID Asta non valido.';
    }
  }

  ngOnDestroy(): void {
    // Non abbiamo più bisogno di un polling periodico, quindi niente da disiscrivere
  }

  // Recupera tutti i giocatori disponibili per l'asta corrente
  getGiocatoriDisponibili(): void {
    this.giocatoriService.getGiocatoriDisponibili(this.idAstaCorrente).subscribe({
      next: (data: iGiocatore[]) => {
        this.giocatori = data;
        this.filterGiocatori();
      },
      error: (error) => {
        console.error('Errore durante il recupero dei giocatori disponibili', error);
      }
    });
  }

  getRandomGiocatore(): void {
    if (this.idAstaCorrente) {
      this.fantacalcioService.getRandomGiocatore(this.idAstaCorrente).subscribe({
        next: (giocatore: iGiocatore) => {
          this.giocatoreSelezionato = giocatore;
        },
        error: (error) => {
          console.error('Errore durante la randomizzazione del giocatore', error);
          this.messaggioErrore = 'Errore durante la randomizzazione del giocatore';
        }
      });
    } else {
      console.error('ID Asta non valido.');
      this.messaggioErrore = 'ID Asta non valido.';
    }
  }

  // Recupera le squadre associate all'asta corrente
  getSquadreByAsta(): void {
    this.squadraService.getSquadreByAsta(this.idAstaCorrente).subscribe({
      next: (data: iSquadra[]) => {
        this.squadre = data;
      },
      error: (error) => {
        console.error('Errore durante il recupero delle squadre', error);
      }
    });
  }

  caricaOperazioni(): void {
    this.operazioniService.getOperazioniByAsta(this.idAstaCorrente).subscribe({
      next: (operazioni: iOperazione[]) => {
        // Aggiorna lo stato delle operazioni tramite il servizio centralizzato
        this.fantacalcioService.aggiornaOperazioni(operazioni);
        this.cdr.detectChanges();  // Forza il rilevamento dei cambiamenti
      },
      error: (error: any) => {
        console.error('Errore durante il caricamento delle operazioni', error);
      }
    });
  }
  filterGiocatori(): void {
    if (this.searchText) {
      this.giocatoriFiltrati = this.giocatori.filter(giocatore =>
        `${giocatore.nome} ${giocatore.cognome}`.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.giocatoriFiltrati = this.giocatori;
    }
  }
  

  selezionaGiocatore(giocatore: iGiocatore): void {
    this.giocatoreSelezionato = giocatore;
  
    // Resetta il testo di ricerca
    this.searchText = '';
  
    // Resetta i giocatori filtrati, dato che il giocatore è stato selezionato
    this.giocatoriFiltrati = [];
  }
  
  onSubmit(operazioneForm: NgForm): void {
    if (!this.giocatoreSelezionato) {
      this.messaggioErrore = 'Devi selezionare un giocatore.';
      return;
    }
  
    if (!this.operazione.iD_Squadra) {
      this.messaggioErrore = 'Devi selezionare una squadra.';
      return;
    }
  
    this.operazione.iD_Giocatore = this.giocatoreSelezionato.iD_Giocatore;
    this.operazione.iD_Asta = this.idAstaCorrente;
  
    this.operazioniService.addOperazione(this.operazione).subscribe(
      (response: iOperazione) => {
        console.log('Operazione creata:', response);
  
        // Notifica il servizio dell'operazione appena creata
        this.fantacalcioService.notificaOperazioneCreata(response);
  
        // Aggiorna le operazioni
        this.caricaOperazioni();
  
        // Aggiorna la lista delle squadre, dei crediti totali e spesi
        this.getSquadreByAsta();
        this.aggiornaCrediti();
  
        // Aggiorna la lista dei giocatori disponibili
        this.getGiocatoriDisponibili();
  
        // Forza il rilevamento dei cambiamenti
        this.cdr.detectChanges();  // Forza il rilevamento dei cambiamenti manualmente
  
        this.mostraMessaggioSuccesso = true;
        setTimeout(() => this.mostraMessaggioSuccesso = false, 3000);
  
        // Reset del form
        this.resetForm(operazioneForm);
      },
      (error) => {
        this.messaggioErrore = 'Errore durante la creazione dell\'operazione: ' + error;
        console.error('Errore durante la creazione dell\'operazione', error);
      }
    );
  }

  aggiornaCrediti(): void {
    this.squadraService.getSquadreByAsta(this.idAstaCorrente).subscribe({
      next: (squadre: iSquadra[]) => {
        this.squadre = squadre;
        // Forza il rilevamento dei cambiamenti per aggiornare la vista
        this.cdr.detectChanges();  // Aggiorna i crediti in tempo reale
      },
      error: (error) => {
        console.error('Errore durante il recupero delle squadre e dei crediti', error);
      }
    });
  }
  
  
  
  
  resetForm(operazioneForm: NgForm): void {
    // Resetta il giocatore selezionato
    this.giocatoreSelezionato = null;
  
    // Resetta la barra di ricerca
    this.searchText = '';
    this.giocatoriFiltrati = [];
  
    // Resetta i campi del form
    this.operazione = {
      iD_Operazione: 0,
      iD_Giocatore: 0,
      iD_Squadra: 0,
      creditiSpesi: 0,  // Imposta a 0 invece di null
      dataOperazione: new Date(),
      statoOperazione: '',
      iD_Asta: this.idAstaCorrente || 0
    };
  
    // Resetta il form nel template
    if (operazioneForm) {
      operazioneForm.resetForm();
    }
  
    // Forza il rilevamento dei cambiamenti per aggiornare la vista
    this.cdr.detectChanges();
  }
  

  svincolaGiocatore(): void {
    if (this.giocatoreSelezionato) {
      this.operazioniService.svincolaGiocatore(this.giocatoreSelezionato.iD_Giocatore!, this.idAstaCorrente).subscribe(
        () => {
          console.log('Giocatore svincolato con successo');
          this.mostraMessaggioSuccesso = true;
          setTimeout(() => this.mostraMessaggioSuccesso = false, 5000);
          this.annullaSelezioneGiocatore();
  
          // Aggiorna la lista dei giocatori disponibili
          this.getGiocatoriDisponibili();
  
          // Forza il rilevamento dei cambiamenti
          this.cdr.detectChanges();
        },
        (error) => {
          const messaggioErrore = error?.message ? error.message : 'Giocatore già svincolato';
          this.messaggioErrore = 'Errore durante lo svincolo del giocatore: ' + messaggioErrore;
          this.mostraMessaggioErrore = true;
          setTimeout(() => this.mostraMessaggioErrore = false, 5000);
          console.error('Errore durante lo svincolo del giocatore', error);
        }
      );
    } else {
      console.error('Nessun giocatore selezionato');
    }
  }
  

  ripristinaGiocatore(): void {
    if (this.giocatoreSelezionato && confirm('Sei sicuro di voler ripristinare questo giocatore?')) {
      this.giocatoriService.updateGiocatoreStato(this.giocatoreSelezionato).subscribe(
        () => {
          console.log('Giocatore ripristinato con successo');
        },
        (error) => {
          this.messaggioErrore = 'Errore durante il ripristino del giocatore';
          console.error('Errore durante il ripristino del giocatore', error);
        }
      );
    }
  }

  annullaSelezioneGiocatore(): void {
    this.giocatoreSelezionato = null;
    this.searchText = '';
    this.giocatoriFiltrati = [];
  }
}