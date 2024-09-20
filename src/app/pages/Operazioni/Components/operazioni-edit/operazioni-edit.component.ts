import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { iOperazione } from '../../i-operazione';
import { OperazioniService } from '../../operazioni.service';

@Component({
  selector: 'app-operazioni-edit',
  templateUrl: './operazioni-edit.component.html',
  styleUrls: ['./operazioni-edit.component.scss']
})
export class OperazioniEditComponent implements OnInit {
  operazione: iOperazione = {
    iD_Operazione: 0,
    iD_Giocatore: 0,
    iD_Squadra: 0,
    creditiSpesi: 0,
    statoOperazione: '',
    dataOperazione: new Date()
  };
  
  messaggioErrore: string = '';

  constructor(
    private operazioniService: OperazioniService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Recupera l'ID dell'operazione dalla route
    const operazioneId = Number(this.route.snapshot.paramMap.get('id'));
    this.getOperazione(operazioneId);
  }

  getOperazione(id: number): void {
    this.operazioniService.getOperazioneById(id).subscribe(
      (data: iOperazione) => {
        // Pre-popola il form con i dati esistenti
        this.operazione = data;
      },
      (error) => {
        this.messaggioErrore = 'Errore nel caricamento dell\'operazione';
        console.error('Errore nel caricamento dell\'operazione', error);
      }
    );
  }

  onSubmit(): void {
    // Invio i dati aggiornati
    this.operazioniService.updateOperazione(this.operazione).subscribe(
      (response) => {
        console.log('Operazione aggiornata con successo', response);
        this.router.navigate(['/operazioni']); // Torna alla lista delle operazioni
      },
      (error) => {
        this.messaggioErrore = 'Errore durante l\'aggiornamento dell\'operazione';
        console.error('Errore durante l\'aggiornamento dell\'operazione', error);
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/operazioni']); // Naviga indietro o alla pagina delle operazioni
  }
}
