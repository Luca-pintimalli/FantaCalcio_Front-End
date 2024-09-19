import { Component, OnInit } from '@angular/core';
import { AstaService } from './asta.service';
import { iAsta } from './i-asta';

@Component({
  selector: 'app-asta',
  templateUrl: './asta.component.html',
  styleUrls: ['./asta.component.scss']
})
export class AstaComponent implements OnInit {
  aste: iAsta[] = []; // Variabile per contenere la lista di aste

  constructor(private astaService: AstaService) { }

  ngOnInit(): void {
    this.getAste(); // Recupera la lista delle aste quando il componente si inizializza
  }

  // Metodo per ottenere tutte le aste
  getAste(): void {
    this.astaService.getAste().subscribe({
      next: (response) => {
        this.aste = response; // Assegna la risposta alla variabile aste
      },
      error: (error) => {
        console.error('Errore nel recupero delle aste', error);
      }
    });
  }


  onDeleteAsta(id: number): void {
    if (confirm('Sei sicuro di voler eliminare questa asta?')) { // Finestra di conferma
      this.astaService.deleteAsta(id).subscribe(() => {
        this.aste = this.aste.filter(asta => asta.iD_Asta !== id); // Rimuove l'asta dalla lista
      });
    }
  }
}
