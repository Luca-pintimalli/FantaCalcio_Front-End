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
import { CreateRuoloMantraComponent } from './pages/Ruoli/Components/create-ruolo-mantra/create-ruolo-mantra.component';
import { EditRuoloMantraComponent } from './pages/Ruoli/Components/edit-ruolo-mantra/edit-ruolo-mantra.component';
import { ModalitaModule } from './pages/modalita/modalita.module';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    CreateRuoloMantraComponent,
    EditRuoloMantraComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, // Solo una volta
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    AuthModule,
    ModalitaModule // Import del modulo Modalita con il suo routing
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
