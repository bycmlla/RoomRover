import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/components/form/Client/client'; 
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent implements OnInit {
  
  formClient!: FormGroup;
  constructor() {}

  ngOnInit(): void {
      this.createForm(new Client())
  }
  
  createForm(client: Client){
    this.formClient = new FormGroup({
      nome: new FormControl(client.name),
      email: new FormControl(client.email),
      phone: new FormControl(client.phone),
      nascimento: new FormControl(client.birthdate),
      nacionalidade: new FormControl(client.nationality),
      genero: new FormControl(client.gender),
      senha: new FormControl(client.password)
    })
  }
  onSubmit(){
    console.log(this.formClient.value)
  }
  
  
}
