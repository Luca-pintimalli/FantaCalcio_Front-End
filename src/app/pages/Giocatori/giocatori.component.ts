import { Component, OnInit } from '@angular/core';
import { iGiocatore } from './i-giocatore';
import { Router } from '@angular/router';
import { GiocatoriService } from './giocatori.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-giocatore',
  templateUrl: './giocatori.component.html',
  styleUrls: ['./giocatori.component.scss']
})
export class GiocatoreComponent implements OnInit {
  giocatoreList: iGiocatore[] = [];
  errore: string | null = null;
  searchTerm: string = '';
  private searchSubject: Subject<string> = new Subject<string>();  // Subject per tracciare il termine di ricerca

  constructor(private giocatoreService: GiocatoriService, private router: Router) {}

  ngOnInit(): void {
    this.loadGiocatori();

    // Gestisce la ricerca con debounce (aspetta 300ms prima di inviare la richiesta)
    this.searchSubject.pipe(
      debounceTime(300),  // Aspetta 300ms dopo ogni digitazione
      distinctUntilChanged()  // Esegue la ricerca solo se il termine cambia
    ).subscribe(searchTerm => {
      if (searchTerm) {
        this.searchGiocatori(searchTerm);  // Se c'è un termine di ricerca, esegui la ricerca
      } else {
        this.loadGiocatori();  // Se il campo è vuoto, ricarica tutti i giocatori
      }
    });
  }

  // Carica la lista dei giocatori dal servizio
  loadGiocatori(): void {
    this.giocatoreService.getAllGiocatori().subscribe(data => {
      this.giocatoreList = data;
    });
  }

  // Naviga alla pagina di modifica per un giocatore
  editGiocatore(id: number): void {
    this.router.navigate(['/giocatori/edit', id]);
  }

  // Elimina un giocatore con conferma
  deleteGiocatore(iD_Giocatore: number | undefined): void {
    if (!iD_Giocatore) {
      this.errore = 'ID giocatore non valido';
      return;
    }

    if (confirm('Sei sicuro di voler eliminare questo giocatore?')) {
      this.giocatoreService.deleteGiocatore(iD_Giocatore).subscribe({
        next: () => {
          this.loadGiocatori();  // Ricarica la lista dopo l'eliminazione
        },
        error: (err) => {
          this.errore = 'Errore durante l\'eliminazione del giocatore';
        }
      });
    }
  }

  // Metodo per navigare alla pagina di creazione di un nuovo giocatore
  createGiocatore(): void {
    this.router.navigate(['/giocatori/create']);
  }

  // Naviga alla pagina di gestione dei ruoli Mantra per il giocatore
  associateRuoloMantra(idGiocatore: number) {
    console.log('ID Giocatore:', idGiocatore);  // Aggiungi un log per verificare l'ID
    this.router.navigate(['/ruolo-mantra', idGiocatore]);  // Naviga verso la route con l'ID
  }

  // Filtra i giocatori per ruolo
  filterGiocatori(ruolo: string): void {
    this.giocatoreService.getGiocatoriByRuolo(ruolo).subscribe({
      next: (data) => {
        this.giocatoreList = data;
      },
      error: (err) => {
        console.error('Errore nel caricamento dei giocatori per ruolo:', err);
      }
    });
  }

  // Cerca i giocatori in base al termine di ricerca
  searchGiocatori(term: string): void {
    this.giocatoreService.getGiocatoriByRuolo('', term).subscribe(data => {
      this.giocatoreList = data;
    });
  }

  onSearchTermChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;  // Esegui il cast qui
    const searchTerm = inputElement.value;
    this.searchSubject.next(searchTerm);  // Aggiorna il subject per innescare la ricerca
  }
  
}