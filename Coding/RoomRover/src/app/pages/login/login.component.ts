import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/api/apiservice.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  constructor(private clientService: ClientService, private authService: AuthService, private router: Router) {}

  login(): void {
    this.clientService.authenticateClient(this.email, this.password).subscribe(
      (response) => {
        if (response.status) {
          localStorage.setItem('token', response.token);
          this.authService.setAuthenticationStatus(true);
          this.router.navigate(['/']); 
        } else {
          console.error('Falha na autenticação', response.message);
        }
      },
      (error) => {
        console.error('Erro na autenticação: ', error);
      }
    );
  }
}
