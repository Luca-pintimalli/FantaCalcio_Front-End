import { Component } from '@angular/core';
import { GiocatoriService } from '../../giocatori.service';
import { iGiocatore } from '../../i-giocatore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aggiungi',
  templateUrl: './aggiungi.component.html',
  styleUrls: ['./aggiungi.component.scss']
})
export class AggiungiComponent {
  nuovoGiocatore: iGiocatore = {
    id_Giocatore: 0,
    nome: '',
    cognome: '',
    squadraAttuale: '',
    goalFatti: 0,
    goalSubiti: 0,
    assist: 0,
    partiteGiocate: 0,
    ruoloClassic: '',
    ruoliMantra: []
  };

  constructor(private giocatoriService: GiocatoriService, private router: Router) {}

  addGiocatore(): void {
    this.giocatoriService.addGiocatore(this.nuovoGiocatore).subscribe(() => {
      this.router.navigate(['/giocatori']); // Torna alla lista
    });
  }
}
