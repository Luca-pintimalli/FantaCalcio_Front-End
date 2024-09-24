import { HttpClient } from "@angular/common/http";
import { iGiocatore } from "../Giocatori/i-giocatore";
import { Observable, BehaviorSubject, Subject, tap } from "rxjs";
import { Injectable } from "@angular/core";
import { iSquadra } from '../squadra/i-squadra';
import { iOperazione } from "../Operazioni/i-operazione";

@Injectable({
  providedIn: 'root',
})
export class FantacalcioService {
  private apiUrlRandomGiocatore = 'https://localhost:7260/api/Asta/prossimogiocatore';  // Endpoint API random
  private apiUrlOperazioni = 'https://localhost:7260/api/Operazione';                   // Endpoint API operazioni
  private apiUrlGetAllGiocatori = 'https://localhost:7260/api/giocatori';               // API per ottenere tutti i giocatori

  // BehaviorSubject per mantenere lo stato di operazioni e squadre
  private operazioniSubject = new BehaviorSubject<iOperazione[]>([]);
  private squadreSubject = new BehaviorSubject<iSquadra[]>([]);

  // Subject per notificare la creazione di un'operazione
  private operazioneCreataSubject = new Subject<iOperazione>();

  // Observable pubblici
  operazioni$ = this.operazioniSubject.asObservable();
  squadre$ = this.squadreSubject.asObservable();
  operazioneCreata$ = this.operazioneCreataSubject.asObservable();

  constructor(private http: HttpClient) {}

// Metodo per randomizzare un giocatore passando l'ID dell'asta
getRandomGiocatore(idAsta: number): Observable<iGiocatore> {
  return this.http.get<iGiocatore>(`${this.apiUrlRandomGiocatore}/${idAsta}`);
}


  // Metodo per ottenere tutti i giocatori (per "a chiamata")
  getAllGiocatori(): Observable<iGiocatore[]> {
    return this.http.get<iGiocatore[]>(this.apiUrlGetAllGiocatori);
  }

  // Metodo per gestire un'operazione (assegnazione di un giocatore)
  createOperazione(operazioneData: iOperazione): Observable<any> {
    return this.http.post<any>(this.apiUrlOperazioni, operazioneData).pipe(
      tap((operazioneCreata: iOperazione) => {
        // Notifica che una nuova operazione è stata creata
        this.notificaOperazioneCreata(operazioneCreata);
      })
    );
  }

  // Metodo per aggiornare lo stato delle operazioni
  aggiornaOperazioni(operazioni: iOperazione[]): void {
    this.operazioniSubject.next(operazioni);
  }

  // Metodo per aggiornare lo stato delle squadre
  aggiornaSquadre(squadre: iSquadra[]): void {
    this.squadreSubject.next(squadre);
  }

  // Notifica i componenti che un'operazione è stata creata, passando l'operazione creata
  notificaOperazioneCreata(operazione: iOperazione): void {
    this.operazioneCreataSubject.next(operazione);
  }
}