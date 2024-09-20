import { Component, OnInit } from '@angular/core';
import { iOperazione } from '../../i-operazione';
import { iGiocatore } from '../../../Giocatori/i-giocatore';
import { iSquadra } from '../../../squadra/i-squadra';
import { SquadraService } from '../../../squadra/squadra.service';
import { OperazioniService } from '../../operazioni.service';
import { GiocatoriService } from '../../../Giocatori/giocatori.service';
import { Router } from '@angular/router'; // Importa Router

@Component({
  selector: 'app-operazioni-create',
  templateUrl: './operazioni-create.component.html',
  styleUrls: ['./operazioni-create.component.scss']
})
export class OperazioniCreateComponent implements OnInit {

  operazione: iOperazione = {
    iD_Operazione: 0,
    iD_Giocatore: 0,
    iD_Squadra: 0,
    creditiSpesi: 0,
    dataOperazione: new Date(),
    statoOperazione: ''
  };

  giocatori: iGiocatore[] = [];
  squadre: iSquadra[] = [];
  erroreAssegnazione: boolean = false;
  messaggioErrore: string = '';

  constructor(
    private operazioniService: OperazioniService,
    private giocatoreService: GiocatoriService,
    private squadraService: SquadraService,
    private router: Router // Aggiungi Router al costruttore
  ) {}

  ngOnInit(): void {
    this.getGiocatori();
    this.getSquadre();
  }

  getGiocatori(): void {
    this.giocatoreService.getAllGiocatori().subscribe((data: iGiocatore[]) => {
      this.giocatori = data;
    });
  }

  getSquadre(): void {
    this.squadraService.getSquadre().subscribe((data: iSquadra[]) => {
      this.squadre = data;
    });
  }

  onSubmit(): void {
    const squadraSelezionata = this.squadre.find(s => s.iD_Squadra === Number(this.operazione.iD_Squadra));

    if (!squadraSelezionata) {
      this.messaggioErrore = 'Squadra non trovata.';
      console.error('Squadra non trovata con ID:', this.operazione.iD_Squadra);
      return;
    }

    // Verifica se il giocatore è già assegnato a una squadra nella stessa asta
    if (this.isGiocatoreAssegnato()) {
      this.erroreAssegnazione = true;
      this.messaggioErrore = 'Il giocatore è già assegnato a una squadra in questa asta.';
    } else {
      // Se tutti i controlli passano, aggiungi l'operazione
      this.operazioniService.addOperazione(this.operazione).subscribe(
        (response) => {
          console.log('Operazione creata:', response);
          this.router.navigate(['/operazioni']); // Reindirizza alla pagina delle operazioni
        },
        (error) => {
          this.messaggioErrore = 'Operazione fallita. Errore: ' + error;
          console.error('Errore durante la creazione dell\'operazione', error);
        }
      );
    }
  }

  isGiocatoreAssegnato(): boolean {
    return false;  // Implementa la logica per verificare se il giocatore è già assegnato
  }
}
