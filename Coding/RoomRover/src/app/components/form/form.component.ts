// form.component.ts
import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/components/form/Client/client';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../services/api/apiservice.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  clientArray: any[] = [];
  isResultLoaded = false;
  formClient!: FormGroup;

  constructor(private fb: FormBuilder, private clientService: ClientService) {
    this.getAllStudent();
  }

  ngOnInit(): void {
    this.createForm(new Client());
  }

  createForm(client: Client) {
    this.formClient = this.fb.group({
      nome: [client.name, Validators.required],
      email: [client.email, Validators.email],
      phone: [client.phone, Validators.required],
      nascimento: [client.birthdate, Validators.required],
      nacionalidade: [client.nationality, Validators.required],
      genero: [client.gender, Validators.required],
    });
  }

  getAllStudent() {
    this.clientService.getAllClients().subscribe(
      (resultData: any) => {
        this.isResultLoaded = true;
        console.log(resultData.data);
        this.clientArray = resultData.data;
      },
      (error) => {
        console.log('erro ao buscar dados: ', error);
      }
    );
  }

  register() {
    console.log('Dados enviados para o servidor:', this.formClient.value);

    if (this.formClient.valid) {
      const bodyData = this.formClient.value;

      this.clientService.addClient(bodyData).subscribe({
        next: (resultData: any) => {
          console.log(resultData);
          alert('Sucesso ao registrar');
          this.getAllStudent();
        },
        error: (error) => {
          console.error('Erro ao registrar:', error);
        },
      });
    }
  }

  onSubmit() {
    console.log(this.formClient.value);
    this.register();
  }
}
