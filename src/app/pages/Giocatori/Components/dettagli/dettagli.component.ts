import { Component, OnInit } from '@angular/core';
import { GiocatoriService } from '../../giocatori.service';
import { iGiocatore } from '../../i-giocatore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dettagli',
  templateUrl: './dettagli.component.html',
  styleUrls: ['./dettagli.component.scss']
})
export class DettagliComponent implements OnInit {
  giocatore: iGiocatore | undefined;
  id: number = 0;

  constructor(
    private giocatoriService: GiocatoriService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.giocatoriService.getGiocatoreById(this.id).subscribe((data) => {
      this.giocatore = data;
    });
  }
}
