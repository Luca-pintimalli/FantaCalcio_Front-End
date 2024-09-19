import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { iAsta } from '../../i-asta';
import { AstaService } from '../../asta.service';

@Component({
  selector: 'app-asta-update',
  templateUrl: './asta-update.component.html',
  styleUrls: ['./asta-update.component.scss']
})
export class AstaUpdateComponent implements OnInit {
  astaForm: FormGroup = this.fb.group({}); // Inizializzazione vuota del form
  astaId: number = 0; // Per contenere l'ID dell'asta corrente
  asta: iAsta | undefined; // Dichiarazione della proprietà 'asta' per contenere i dati dell'asta

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private astaService: AstaService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createForm();
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.astaId = +id; // Converte l'ID in numero
      this.astaService.getAstaById(this.astaId).subscribe((data: iAsta) => {
        this.asta = data; // Assegna i dati dell'asta alla proprietà 'asta'
        this.astaForm.patchValue(this.asta); // Popola il form con i dati dell'asta
      });
    }
  }

  createForm(): void {
    this.astaForm = this.fb.group({
      iD_TipoAsta: ['', Validators.required],
      numeroSquadre: ['', [Validators.required, Validators.min(1)]],
      creditiDisponibili: ['', Validators.required],
      iD_Modalita: ['', Validators.required],
      maxPortieri: ['', [Validators.required, Validators.min(1)]],
      maxDifensori: ['', [Validators.required, Validators.min(1)]],
      maxCentrocampisti: ['', [Validators.required, Validators.min(1)]],
      maxAttaccanti: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit(): void {
    if (this.astaForm.valid) {
      this.astaService.updateAsta(this.astaId, this.astaForm.value).subscribe(() => {
        this.router.navigate(['/Asta']);
      });
    }
  }
}
