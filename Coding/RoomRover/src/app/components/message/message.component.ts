import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent {
  message: string = '';
  messageButton: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.message = params['message'];
      this.messageButton = params['messageButton'];
    });
  }
}
