import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/components/form/Client/client';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  clientArray: any[] = [];
  isResultLoaded = false;
  formClient!: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.getAllStudent();
  }

  ngOnInit(): void {
    this.createForm(new Client());
  }

  getAllStudent() {
    this.http.get('http://localhost:8080/form').subscribe(
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
    console.log('Método register() chamado!');
    if (this.formClient.valid) {
      const bodyData = this.formClient.value;

      this.http.post('http://localhost:8080/form/add', bodyData).subscribe({
        next: (resultData: any) => {
          console.log(resultData);
          alert('Sucesso ao registrar');
          this.getAllStudent();
        },
        error: (error) => {
          console.error('erro ao registrar:', error);
        },
      });
    }
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

  onSubmit() {
    console.log(this.formClient.value);
  }
}
