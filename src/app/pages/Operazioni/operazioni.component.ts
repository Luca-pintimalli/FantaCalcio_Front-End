import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OperazioniService } from './operazioni.service';

@Component({
  selector: 'app-operazioni',
  templateUrl: './operazioni.component.html',
  styleUrls: ['./operazioni.component.scss']
})
export class OperazioniComponent implements OnInit {
  operazioni: any[] = [];
  messaggioErrore: string = '';

  constructor(private operazioniService: OperazioniService, private router: Router) {}

  ngOnInit(): void {
    this.loadOperazioni();
  }

  loadOperazioni(): void {
    this.operazioniService.getOperazioni().subscribe(
      (data: any[]) => {
        this.operazioni = data;
      },
      (error) => {
        this.messaggioErrore = 'Errore nel caricamento delle operazioni';
        console.error(error);
      }
    );
  }

  navigateToCreate(): void {
    this.router.navigate(['/operazioni/operazione-create']);
  }

  navigateToEdit(id: number): void {
    this.router.navigate(['/operazioni/edit', id]);
  }

  // Metodo per eliminare un'operazione e ripristinare i crediti alla squadra
  deleteOperazione(idOperazione: number, idSquadra: number, creditiSpesi: number): void {
    if (confirm('Sei sicuro di voler eliminare questa operazione?')) {
      this.operazioniService.deleteOperazione(idOperazione, idSquadra, creditiSpesi).subscribe(
        () => {
          console.log('Operazione eliminata con successo');
          this.loadOperazioni(); // Ricarica l'elenco delle operazioni
        },
        (error) => {
          this.messaggioErrore = 'Errore durante l\'eliminazione dell\'operazione';
          console.error('Errore durante l\'eliminazione dell\'operazione', error);
        }
      );
    }
  }



}
