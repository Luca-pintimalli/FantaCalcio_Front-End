import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { iAsta } from '../../i-asta';
import { AstaService } from '../../asta.service';


@Component({
  selector: 'app-dettagli-asta',
  templateUrl: './dettagli-asta.component.html',
  styleUrls: ['./dettagli-asta.component.scss']
})
export class DettagliAstaComponent implements OnInit {

  asta: iAsta | undefined;

  constructor(
    private route: ActivatedRoute,
    private astaService: AstaService
  ) { }

  ngOnInit(): void {
    // Ottieni l'ID dell'asta dalla rotta
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getAstaById(id);
  }

  // Metodo per ottenere i dettagli dell'asta tramite il servizio
  getAstaById(id: number): void {
    this.astaService.getAstaById(id).subscribe({
      next: (response) => {
        this.asta = response;
      },
      error: (error) => {
        console.error('Errore nel recupero dei dettagli dell\'asta', error);
      }
    });
  }
}
