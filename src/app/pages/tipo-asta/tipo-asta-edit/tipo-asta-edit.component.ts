import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoAstaService } from '../tipo-asta.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { iTipoAsta } from '../i-tipo-asta';

@Component({
  selector: 'app-tipo-asta-edit',
  templateUrl: './tipo-asta-edit.component.html'
})
export class TipoAstaEditComponent implements OnInit {
  tipoAstaForm: FormGroup;
  id!: number;
  tipoAsta!: iTipoAsta;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tipoAstaService: TipoAstaService,
    private fb: FormBuilder
  ) {
    // Inizializza il form e imposta ID_tipoAasta come disabilitato direttamente nel TypeScript
    this.tipoAstaForm = this.fb.group({
      ID_tipoAasta: [{ value: '', disabled: true }, Validators.required],  // Imposta il controllo come disabilitato
      NomeTipoAsta: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.tipoAstaService.getTipoAstaById(this.id).subscribe(data => {
      this.tipoAsta = data;
      this.tipoAstaForm.patchValue({
        ID_tipoAasta: this.tipoAsta.iD_TipoAsta,
        NomeTipoAsta: this.tipoAsta.nomeTipoAsta
      });
    });
  }

  onSubmit(): void {
    if (this.tipoAstaForm.valid) {
      const updatedTipoAsta: iTipoAsta = {
        iD_TipoAsta: this.tipoAsta.iD_TipoAsta,
        nomeTipoAsta: this.tipoAstaForm.get('NomeTipoAsta')?.value
      };

      this.tipoAstaService.updateTipoAsta(this.id, updatedTipoAsta).subscribe(() => {
        this.router.navigate(['/TipoAsta']);
      });
    }
  }

  // Metodo per gestire la navigazione
  onCancel(): void {
    this.router.navigate(['/TipoAsta']);
  }
}
