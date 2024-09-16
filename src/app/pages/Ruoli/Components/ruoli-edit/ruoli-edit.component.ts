import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RuoliService } from '../../ruoli.service';
import { ActivatedRoute, Router } from '@angular/router';
import { iRuolo } from '../../i-ruolo';

@Component({
  selector: 'app-ruoli-edit',
  templateUrl: './ruoli-edit.component.html',
  styleUrls: ['./ruoli-edit.component.scss']
})
export class RuoliEditComponent implements OnInit {
  ruoloForm: FormGroup;
  iD_Ruolo!: number;
  ruolo!: iRuolo;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ruoloService: RuoliService,
    private fb: FormBuilder
  ) {
    // Inizializzazione del form con validazioni e disabilitazione del campo iD_Modalita
    this.ruoloForm = this.fb.group({
      iD_Ruolo: [{ value: '', disabled: true }, Validators.required], // ID Ruolo disabilitato
      nomeRuolo: ['', Validators.required],  // Nome Ruolo obbligatorio
      iD_Modalita: [{ value: '', disabled: true }, Validators.required]  // ID Modalità disabilitato
    });
  }

  ngOnInit(): void {
    this.iD_Ruolo = +this.route.snapshot.paramMap.get('id')!; // Recupera l'ID dalla rotta
    this.ruoloService.getRuoloById(this.iD_Ruolo).subscribe(data => {
      this.ruolo = data;
      this.ruoloForm.patchValue({
        iD_Ruolo: this.ruolo.iD_Ruolo,
        nomeRuolo: this.ruolo.nomeRuolo,
        iD_Modalita: this.ruolo.iD_Modalita  // Mantieni il valore di iD_Modalita ma disabilitato
      });
    });
  }

  // Metodo per aggiornare solo il nome del ruolo
  updateRuolo(): void {
    if (this.ruoloForm.valid) {
      const updatedRuolo: iRuolo = {
        iD_Ruolo: this.ruolo.iD_Ruolo, // Mantieni l'ID del ruolo esistente
        nomeRuolo: this.ruoloForm.get('nomeRuolo')?.value,
        iD_Modalita: this.ruolo.iD_Modalita  // Mantieni l'ID Modalità esistente
      };

      this.ruoloService.editRuolo(this.iD_Ruolo, updatedRuolo).subscribe(() => {
        this.router.navigate(['/ruoli']);  // Naviga alla lista dei ruoli dopo l'aggiornamento
      });
    }
  }

  // Metodo per annullare e tornare alla lista dei ruoli
  onCancel(): void {
    this.router.navigate(['/ruoli']);
  }
}
