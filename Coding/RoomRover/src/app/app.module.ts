import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormComponent } from './components/form/form.component';
import {HttpClientModule} from '@angular/common/http';
import { ClientService } from './services/api/apiservice.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Client } from './components/form/Client/client';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FormComponent
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
