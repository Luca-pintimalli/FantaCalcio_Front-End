import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FantacalcioService } from './fantacalcio.service';

@Component({
  selector: 'app-fantacalcio',
  templateUrl: './fantacalcio.component.html',
  styleUrls: ['./fantacalcio.component.scss']
})
export class FantacalcioComponent implements OnInit {
  astaInCorso: boolean = false;  // Inizialmente, l'asta non è in corso
  isAstaImpostazioni: boolean = true;  // Mostra la fase di impostazioni inizialmente
  idAstaCorrente: number | null = null; // ID dell'asta corrente

  constructor(
    private route: ActivatedRoute,
    private fantacalcioService: FantacalcioService  // Inietta il servizio Fantacalcio
  ) {}

  ngOnInit(): void {
    // Recupera lo stato dell'asta e le impostazioni dall'ultimo accesso
    const statoAsta = localStorage.getItem('astaInCorso');
    const statoImpostazioni = localStorage.getItem('isAstaImpostazioni');
    const idAstaSalvata = localStorage.getItem('idAstaCorrente');
    
    if (statoAsta !== null) {
      this.astaInCorso = JSON.parse(statoAsta);
    }
  
    if (statoImpostazioni !== null) {
      this.isAstaImpostazioni = JSON.parse(statoImpostazioni);
    }
  
    if (idAstaSalvata !== null) {
      this.idAstaCorrente = JSON.parse(idAstaSalvata);  // Recupera l'ID dell'asta salvato
    }
  
    // Se l'ID non è ancora stato impostato, cerca di recuperarlo dai parametri della query string
    this.route.queryParams.subscribe(params => {
      if (!this.idAstaCorrente) {
        this.idAstaCorrente = +params['idAsta'] || null;
        if (this.idAstaCorrente) {
          localStorage.setItem('idAstaCorrente', JSON.stringify(this.idAstaCorrente));  // Salva l'ID nel localStorage
        }
      }
    });
  }
  
  // Quando le impostazioni sono completate, avvia l'asta
  onImpostazioniComplete(idAsta: number): void {
    if (idAsta) {
      this.idAstaCorrente = idAsta;  // Salva l'ID dell'asta corrente
      localStorage.setItem('idAstaCorrente', JSON.stringify(this.idAstaCorrente));
      this.isAstaImpostazioni = false;  // Passa alla fase successiva
      this.astaInCorso = true;  // L'asta è in corso
      localStorage.setItem('astaInCorso', JSON.stringify(this.astaInCorso));  // Salva lo stato dell'asta
      localStorage.setItem('isAstaImpostazioni', JSON.stringify(this.isAstaImpostazioni));  // Salva lo stato delle impostazioni

      // Ricarica le squadre e operazioni iniziali (se necessario)
      this.fantacalcioService.aggiornaOperazioni([]);  // Inizializza le operazioni
      this.fantacalcioService.aggiornaSquadre([]);     // Inizializza le squadre
    } else {
      console.error('ID Asta non valido');
    }
  }

  // Metodo per terminare l'asta
  terminaAsta(): void {
    this.astaInCorso = false;
    this.isAstaImpostazioni = true;  // Ritorna alla schermata iniziale per una nuova asta
    this.idAstaCorrente = null;  // Reset dell'ID dell'asta corrente
    localStorage.removeItem('idAstaCorrente');  // Rimuove l'ID dell'asta corrente quando l'asta termina
    localStorage.setItem('astaInCorso', JSON.stringify(this.astaInCorso));  // Aggiorna lo stato dell'asta
    localStorage.setItem('isAstaImpostazioni', JSON.stringify(this.isAstaImpostazioni));  // Ritorna alla fase delle impostazioni

    // Resetta lo stato delle operazioni e delle squadre
    this.fantacalcioService.aggiornaOperazioni([]);
    this.fantacalcioService.aggiornaSquadre([]);
  }

  // Metodo per iniziare una nuova asta
  iniziaNuovaAsta(): void {
    this.astaInCorso = true;
    this.isAstaImpostazioni = true;  // Ritorna alla schermata delle impostazioni
    localStorage.setItem('astaInCorso', JSON.stringify(this.astaInCorso));  // Aggiorna lo stato
    localStorage.setItem('isAstaImpostazioni', JSON.stringify(this.isAstaImpostazioni));  // Reset delle impostazioni

    // Resetta lo stato delle operazioni e delle squadre
    this.fantacalcioService.aggiornaOperazioni([]);
    this.fantacalcioService.aggiornaSquadre([]);
  }
}