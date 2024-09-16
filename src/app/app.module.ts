import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';
import { AuthInterceptor } from './auth/auth.interceptor';
import { ModalitaModule } from './pages/modalita/modalita.module';
import { TipoAstaModule } from './pages/tipo-asta/tipo-asta.module';
import { RuoliCreateComponent } from './pages/Ruoli/Components/ruoli-create/ruoli-create.component';
import { RuoliEditComponent } from './pages/Ruoli/Components/ruoli-edit/ruoli-edit.component'; // Importa il modulo TipoAsta

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    RuoliCreateComponent,
    RuoliEditComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    AuthModule,
    ModalitaModule,  // Modulo Modalita importato correttamente
    TipoAstaModule  // Modulo TipoAsta importato correttamente
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
