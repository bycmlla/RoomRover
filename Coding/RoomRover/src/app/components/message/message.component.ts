import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent {
  message: string = '';
  messageButton: string = '';
  redirectRoute: string = '/reservations';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.message = params['message'];
      this.messageButton = params['messageButton'];
    });
  }
  redirectToRoute() {
    this.router.navigate([this.redirectRoute]);
  }
}
