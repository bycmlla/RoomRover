import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/Client/client';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../services/api/apiservice.service';
import { Address } from 'src/app/models/Address/address';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  clientArray: any[] = [];
  isResultLoaded = false;
  formClient!: FormGroup;
  formAddress!: FormGroup;
  showAddressForm: boolean = false;
  showPassportForm: boolean = false;

  toggleAddressForm() {
    this.showAddressForm = true;
    this.showPassportForm = false;
  }

  togglePassportForm() {
    this.showAddressForm = false;
    this.showPassportForm = true;
  }

  saveAddress() {
    this.showAddressForm = false;
  }

  savePassport() {
    this.showPassportForm = false;
  }

  constructor(private fb: FormBuilder, private clientService: ClientService) {
    this.getAllStudent();
  }

  ngOnInit(): void {
    this.createForm(
      new Client('', '', '', '', '', '', '', new Address('', '', '', ''))
    );
  }

  createForm(client: Client) {
    this.formClient = this.fb.group({
      nome: [client.name, Validators.required],
      email: [client.email, Validators.email],
      phone: [client.phone, Validators.required],
      nascimento: [client.birthdate, Validators.required],
      nacionalidade: [client.nationality, Validators.required],
      genero: [client.gender, Validators.required],
      senha: [client.password, Validators.required],
    });
  }
  createAddress(address: Address) {
    this.formAddress = this.fb.group({
      pais: [address.country, Validators.required],
      endereco: [address.address, Validators.required],
      cidade: [address.city, Validators.required],
      cep: [address.zipcode, Validators.required],
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
