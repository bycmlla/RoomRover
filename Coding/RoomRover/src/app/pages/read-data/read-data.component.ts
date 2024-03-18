import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/api/apiservice.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-read-data',
  templateUrl: './read-data.component.html',
  styleUrls: ['./read-data.component.scss'],
  providers: [DatePipe],
})
export class ReadDataComponent implements OnInit {
  userData: any[] = [];
  userId: number | undefined;
  isEditing: boolean = false;
  isAllEditing: boolean = false;
  editedField: string | null = null;
  editedUserData: any = {};
  editedValues: any[] = [];
  fieldNotSaved: boolean = false;

  constructor(
    private clientService: ClientService,
    private authService: AuthService,
    private datePipe: DatePipe,
    private router: Router
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
    this.loadUserData();
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
      console.error(
        'Campo editado não está definido ou não existe nos dados editados.'
      );
      this.fieldNotSaved = false;
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
          window.location.reload();
        },
        (error) => {
          console.error('Erro ao atualizar dados do usuário: ', error);
        }
      );
      this.fieldNotSaved = false;
    } else if (this.isEditing && this.fieldNotSaved) {
      console.error('Você precisa salvar o campo antes de atualizar os dados.');
    } else {
      console.error(
        'userId ou nenhum campo foi editado.',
        this.userId,
        this.editedField
      );
      this.fieldNotSaved = true;
    }
  }
  cancelEditing(): void {
    this.isAllEditing = false;
  }
  currentDate(): Date {
    return new Date();
  }
  deleteAccount(): void {
    if (this.userId !== undefined) {
      this.clientService.deleteUser(this.userId).subscribe(
        (response) => {
          console.log('Conta excluída com sucesso:', response);
          this.authService.logout();
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Erro ao excluir conta do usuário: ', error);
        }
      );
    } else {
      console.error('userId está undefined. Não é possível excluir a conta.');
    }
  }
}
