import { Component } from '@angular/core';

@Component({
  selector: 'app-first-component',
  templateUrl: './first-component.component.html',
  styleUrls: ['./first-component.component.scss']
})
export class FirstComponentComponent {
  name = 'Camila';
  nome: String = 'matheus';
  age: number = 30;
  hobbies = ['correr', 'cantar', 'estudar'];
  cars = {
    name: 'oii'
  }  


  
}
