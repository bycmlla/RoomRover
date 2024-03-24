import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { ReadDataComponent } from './pages/read-data/read-data.component';
import { AccommodationComponent } from './pages/accommodation/accommodation.component';
import { AccommodationDetailsComponent } from './pages/accommodation-details/accommodation-details.component';
import { ReservationsComponent } from './pages/reservations/reservations.component';
import { ReservationsDetailsComponent } from './pages/reservations-details/reservations-details.component';
import { MessageComponent } from './components/message/message.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'read-data', component: ReadDataComponent },
  { path: 'accommodations', component: AccommodationComponent },
  { path: 'accommodations-details/:idhotelfk', component: AccommodationDetailsComponent },
  { path: 'reservations', component: ReservationsComponent },
  { path: 'reservations-details', component: ReservationsDetailsComponent },  
  { path: 'message', component: MessageComponent },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
