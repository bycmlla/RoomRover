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
  showAddressForm: boolean = false;
  showPassportForm: boolean = false;
  formClient!: FormGroup;
  formAddress!: FormGroup;
  addressData: any = {};

  toggleAddressForm() {
    this.showAddressForm = true;
    this.showPassportForm = false;
  }

  togglePassportForm() {
    this.showAddressForm = false;
    this.showPassportForm = true;
  }

  savePassport() {
    this.showPassportForm = false;
  }
  
  constructor(private fb: FormBuilder, private clientService: ClientService) {
    this.getAllStudent();
  }
  
  ngOnInit(): void {
    this.createAddress(new Address('', '', '', ''));
    this.createForm(
      new Client('', '', '', '', '', '', '', this.formAddress.value)
      );
    }
    createAddress(address: Address) {
      this.formAddress = this.fb.group({
        pais: address.country,
        endereco: address.address,
        cidade: address.city,
        cep: address.zipcode,
      });
      console.log(this.formAddress.value) 
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
        endereco: this.formAddress,
      });
    }
    
    saveAddress() {
      this.addressData = this.formAddress.value;
      this.createAddress(this.addressData);
      this.showAddressForm = false;
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
      const clientData = {
        ...this.formClient.value,
        address: this.formAddress.value,
      };

      this.clientService.addClient(clientData).subscribe({
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
