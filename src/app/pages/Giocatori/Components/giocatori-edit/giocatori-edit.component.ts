import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { iGiocatore } from '../../../Giocatori/i-giocatore';
import { GiocatoriService } from '../../../Giocatori/giocatori.service';
import { RuoliService } from '../../../Ruoli/ruoli.service';

@Component({
  selector: 'app-giocatori-edit',
  templateUrl: './giocatori-edit.component.html',
  styleUrls: ['./giocatori-edit.component.scss']
})
export class GiocatoriEditComponent implements OnInit {
  giocatore: iGiocatore | undefined;
  iD_Giocatore: number = 0; // Correzione del nome del campo in base alla tua interfaccia
  ruoli: any[] = []; // Aggiunta di un array per gestire i ruoli

  constructor(
    private giocatoriService: GiocatoriService,
    private ruoliService: RuoliService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id && id > 0) {
      this.iD_Giocatore = id; // Usando iD_Giocatore come per la tua interfaccia
      this.caricaGiocatore();
      this.loadRuoli();
    } else {
      console.error('ID giocatore non valido:', id);
    }
  }

  // Metodo per caricare i dettagli del giocatore
  caricaGiocatore(): void {
    this.giocatoriService.getGiocatoreById(this.iD_Giocatore).subscribe({
      next: (data: iGiocatore) => {
        this.giocatore = data;
        console.log('Giocatore caricato:', this.giocatore);
      },
      error: (err) => {
        console.error('Errore nel caricamento del giocatore:', err);
      }
    });
  }

  // Metodo per caricare i ruoli
  loadRuoli(): void {
    this.ruoliService.getAllRuoli().subscribe({
      next: (ruoli) => {
        this.ruoli = ruoli;
        console.log('Ruoli caricati:', ruoli);
      },
      error: (err) => {
        console.error('Errore nel caricamento dei ruoli:', err);
      }
    });
  }
}
