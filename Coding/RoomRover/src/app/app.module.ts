import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar-simple/navbar.component';
import {HttpClientModule} from '@angular/common/http';
import { ClientService } from './services/api/apiservice.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { NavbarMainComponent } from './components/navbar-main/navbar-main.component';
import { FooterComponent } from './components/footer/footer.component';
import { ReadDataComponent } from './pages/read-data/read-data.component';
import { AccommodationComponent } from './pages/accommodation/accommodation.component';
import { AccommodationDetailsComponent } from './pages/accommodation-details/accommodation-details.component';
import { ReservationsComponent } from './pages/reservations/reservations.component';
import { ReservationsDetailsComponent } from './pages/reservations-details/reservations-details.component';
import { MessageComponent } from './components/message/message.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    NavbarMainComponent,
    FooterComponent,
    ReadDataComponent,
    AccommodationComponent,
    AccommodationDetailsComponent,
    ReservationsComponent,
    ReservationsDetailsComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [ClientService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
