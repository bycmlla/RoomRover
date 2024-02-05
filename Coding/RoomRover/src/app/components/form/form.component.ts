import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/components/form/Client/client';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/app/services/api/apiservice.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  formClient!: FormGroup;

  constructor(private service: ApiserviceService) {}
  // readData: any;
  errormsg: any;

  closeAlert() {
    this.errormsg = '';
  }

  ngOnInit(): void {
    this.createForm(new Client());
  }

  createForm(client: Client) {
    this.formClient = new FormGroup({
      name: new FormControl(client.name, Validators.required),
      email: new FormControl(client.email, Validators.required),
      phone: new FormControl(client.phone, Validators.required),
      birthdate: new FormControl(client.birthdate, Validators.required),
      nationality: new FormControl(client.nationality, Validators.required),
      gender: new FormControl(client.gender, Validators.required),
      // password: new FormControl(client.password),
    });
  }
  onSubmit() {
    if (this.formClient.valid) {
      console.log(this.formClient.value);
      this.service.createData(this.formClient.value).subscribe(
        (res) => {
          console.log(res, 'res==>');
        },
        (error) => {
          console.error(error);
          this.errormsg = 'erro ao enviar dados para o servidor';
        }
      );
    } else {
      this.errormsg = 'Por favor, preencha todos os campos corretamente.';
    }
  }
}
