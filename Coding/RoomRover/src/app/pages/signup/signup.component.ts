import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../services/api/apiservice.service';
import { Client } from 'src/app/models/Client/client';
import { Address } from 'src/app/models/Address/address';
import { Passport } from './../../models/Passport/passport';

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
  formPassport!: FormGroup;
  savedAddressData: any = {};
  savedPassportData: any = {};

  constructor(private fb: FormBuilder, private clientService: ClientService) {
    this.getAllStudent();
  }

  ngOnInit(): void {
    this.createAddress(new Address('', '', '', ''));
    this.createPassport(new Passport('', '', '', ''));
    this.createForm(
      new Client(
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        this.formAddress.value,
        this.formPassport.value
      )
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
      endereco: this.formAddress,
      passaporte: this.formPassport,
    });
  }

  createAddress(address: Address) {
    this.formAddress = this.fb.group({
      pais: address.country,
      endereco: address.address,
      cidade: address.city,
      cep: address.zipcode,
    });
    console.log(this.formAddress.value);
  }
  createPassport(passport: Passport) {
    this.formPassport = this.fb.group({
      nomePassaporte: passport.namePassport,
      numero: passport.number,
      paisEmissor: passport.issuingCountry,
      dataExpiracao: passport.expirationDate,
    });
  }

  saveAddress() {
    this.savedAddressData = this.formAddress.value;
    this.showAddressForm = false;
    console.log(this.savedAddressData);
  }

  savePassport() {
    this.savedPassportData = this.formPassport.value;
    this.showPassportForm = false;
    console.log(this.savedPassportData);
  }
  toggleAddressForm() {
    this.showAddressForm = true;
    this.showPassportForm = false;
  }

  togglePassportForm() {
    this.showAddressForm = false;
    this.showPassportForm = true;
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
