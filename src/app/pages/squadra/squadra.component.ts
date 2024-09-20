import { Component, OnInit } from '@angular/core';
import { SquadraService } from './squadra.service';  // Importa il servizio
import { iSquadra } from './i-squadra';  // Importa l'interfaccia
import { Router } from '@angular/router';  // Importa Router per la navigazione

@Component({
  selector: 'app-squadra',
  templateUrl: './squadra.component.html',
  styleUrls: ['./squadra.component.scss']
})
export class SquadraComponent implements OnInit {
  squadre: iSquadra[] = [];  // Array per memorizzare le squadre
  isLoading = true;  // Variabile per mostrare un indicatore di caricamento
  errorMessage: string = '';  // Variabile per gestire eventuali errori

  constructor(
    private squadraService: SquadraService,  // Inietta il servizio delle squadre
    private router: Router  // Inietta il router per la navigazione
  ) {}

  // Metodo chiamato all'inizializzazione del componente
  ngOnInit(): void {
    this.getSquadre();  // Carica le squadre al caricamento del componente
  }

  // Metodo per ottenere tutte le squadre
  getSquadre(): void {
    this.squadraService.getSquadre().subscribe({
      next: (data: iSquadra[]) => {
        this.squadre = data;  // Assegna i dati delle squadre
        this.isLoading = false;  // Nasconde il loader dopo il caricamento
      },
      error: (error) => {
        this.errorMessage = 'Errore nel caricamento delle squadre';  // Gestione errore
        this.isLoading = false;  // Nasconde il loader in caso di errore
      }
    });
  }

  // Funzione per la modifica della squadra
  editSquadra(id: number): void {
    this.router.navigate([`/Squadra/edit`, id]);
  }
  deleteSquadra(id: number): void {
    // Logica per eliminare la squadra
    console.log(`Elimina squadra con ID: ${id}`);
  }
}
