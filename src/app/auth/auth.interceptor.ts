import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authSvc: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const accessData = this.authSvc.getAccessData();  // Ottieni i dati di accesso (incluso il token)

    // Se non c'è token o se è scaduto, procedi senza modificare la richiesta
    if (!accessData || !accessData.token) {
      return next.handle(request);
    }

    // Clona la richiesta originale aggiungendo l'header Authorization
    const clonedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessData.token}`  // Aggiungi il token all'header Authorization
      }
    });

    // Continua il flusso con la richiesta modificata
    return next.handle(clonedRequest);
  }
}
