import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-parents-data',
  templateUrl: './parents-data.component.html',
  styleUrls: ['./parents-data.component.scss']
})
export class ParentsDataComponent {
  @Input() name: string = "";
}
