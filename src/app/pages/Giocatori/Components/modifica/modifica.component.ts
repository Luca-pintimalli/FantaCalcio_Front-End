import { Component, OnInit } from '@angular/core';
import { GiocatoriService } from '../../giocatori.service';
import { iGiocatore } from '../../i-giocatore';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modifica',
  templateUrl: './modifica.component.html',
  styleUrls: ['./modifica.component.scss']
})
export class ModificaComponent implements OnInit {
  giocatore: iGiocatore | undefined;
  id: number = 0;

  constructor(
    private giocatoriService: GiocatoriService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.giocatoriService.getGiocatoreById(this.id).subscribe((data) => {
      this.giocatore = data;
    });
  }

  updateGiocatore(): void {
    if (this.giocatore) {
      this.giocatoriService.updateGiocatore(this.id, this.giocatore).subscribe(() => {
        this.router.navigate(['/giocatori']); // Torna alla lista
      });
    }
  }
}
