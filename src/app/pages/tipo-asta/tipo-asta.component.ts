import { Component, OnInit } from '@angular/core';
import { TipoAstaService } from './tipo-asta.service';
import { Router } from '@angular/router';
import { iTipoAsta } from './i-tipo-asta';

@Component({
  selector: 'app-tipo-asta',
  templateUrl: './tipo-asta.component.html'
})
export class TipoAstaComponent implements OnInit {
  tipoAstaList: iTipoAsta[] = [];

  constructor(private tipoAstaService: TipoAstaService, private router: Router) {}

  ngOnInit(): void {
    this.loadTipoAste();
  }

  // Carica la lista dei tipi di asta dal servizio
  loadTipoAste(): void {
    this.tipoAstaService.getAllTipoAsta().subscribe(data => {
      this.tipoAstaList = data;
    });
  }

  // Naviga alla pagina di modifica per un tipo di asta
  editTipoAsta(id: number): void {
    this.router.navigate(['/TipoAsta/edit', id]);
  }

  // Elimina un tipo di asta con conferma
  deleteTipoAsta(id: number): void {
    console.log('Elimina tipo di asta con ID:', id); // Verifica che il metodo venga chiamato
    if (confirm('Sei sicuro di voler eliminare questo tipo di asta?')) {
      this.tipoAstaService.deleteTipoAsta(id).subscribe(() => {
        this.loadTipoAste();  // Ricarica la lista dopo l'eliminazione
      });
    }
  }

  // Naviga alla pagina di creazione di un nuovo tipo di asta
  createTipoAsta(): void {
    this.router.navigate(['/TipoAsta/create']);
  }
}
