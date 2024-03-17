import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/api/apiservice.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-read-data',
  templateUrl: './read-data.component.html',
  styleUrls: ['./read-data.component.scss'],
})
export class ReadDataComponent implements OnInit {
  userData: any[] = [];
  userId: number | undefined;
  isEditing: boolean = false;
  isAllEditing: boolean = false;
  editedField: string | null = null;
  editedUserData: any = {};
  editedValues: any[] = [];

  constructor(
    private clientService: ClientService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getUserId().subscribe(
      (userId: number) => {
        if (userId) {
          this.userId = userId;
          this.loadUserData();
        } else {
          console.error('userId não está disponível');
        }
      },
      (error) => {
        console.error('Erro ao obter userId:', error);
      }
    );
  }

  loadUserData(): void {
    if (this.userId !== undefined) {
      this.clientService.getAllClients(this.userId).subscribe(
        (response) => {
          if (Array.isArray(response)) {
            this.userData = response;
          } else {
            console.error('Resposta inválida: não é um array', response);
          }
        },
        (error) => {
          console.error('Erro ao obter dados do usuário: ', error);
        }
      );
    } else {
      console.error(
        'userId está undefined. Certifique-se de que foi definido corretamente.'
      );
    }
  }

  toggleEditing(field: string | null = null): void {
    if (
      this.isEditing &&
      this.editedField !== field &&
      this.editedField !== null
    ) {
      this.saveEdit(this.editedField, this.editedUserData[this.editedField]);
    }
    this.isEditing = !this.isEditing;
    this.isAllEditing = true;
    this.editedField = field;
    this.editedUserData = {
      ...this.userData.find((user) => user.id === this.userId),
    };
    this.editedValues = [];
  }
  
  
  saveEdit(fieldName: string, newValue: any): void {
    if (fieldName !== null && this.editedUserData.hasOwnProperty(fieldName)) {
      this.editedUserData[fieldName] = newValue;
      this.editedValues.push({ field: fieldName, value: newValue });
    } else {
      console.error('Campo editado não está definido ou não existe nos dados editados.');
    }
    this.isEditing = false;
  }
  
  okEdit(): void {
    if (this.userId !== undefined && this.editedValues.length > 0) {
      const updatedData: { [key: string]: any } = {}; 
      this.editedValues.forEach((editedValue) => {
        updatedData[editedValue.field] = editedValue.value;
      });
  
      this.clientService.updateUserData(this.userId, updatedData).subscribe(
        (response) => {
          console.log('Dados do usuário atualizados com sucesso:', response);
          this.editedValues = [];
        },
        (error) => {
          console.error('Erro ao atualizar dados do usuário: ', error);
        }
      );
    } else {
      console.error(
        'userId ou nenhum campo foi editado.',
        this.userId,
        this.editedField
      );
    }
  }
  
  
}
