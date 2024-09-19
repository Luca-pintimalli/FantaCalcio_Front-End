import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { iGiocatore } from '../../i-giocatore';
import { GiocatoriService } from '../../giocatori.service';

@Component({
  selector: 'app-giocatori-list-public',
  templateUrl: './giocatori-list-public.component.html',  // Percorso corretto
  styleUrls: ['./giocatori-list-public.component.scss']
})
export class GiocatoriListPublicComponent implements OnInit {
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
