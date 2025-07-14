import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedModule } from '../../../shared.module';
import { flush } from '@angular/core/testing';

@Component({
  selector: 'app-events-booking-details',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './events-booking-details.component.html',
  styleUrl: './events-booking-details.component.css',
})
export class EventsBookingDetailsComponent {
  isEventReg: boolean = true;
  isPartDet: boolean = false;
  isPayment: boolean = false;
  isConf: boolean = false;

  constructor(private router: Router) {}

  items = [
    { header: 'Participant 1', isOpen: false },
    { header: 'Participant 2', isOpen: true },
    { header: 'Participant 3', isOpen: false },
  ];

  toggleItem(item: any): void {
    item.isOpen = !item.isOpen;
  }

  navigate(a: string) {
    if (a === 'event-reg') {
      this.isPartDet = false;
      this.isPayment = false;
      this.isConf = false;
      this.isEventReg = true;
    } else if (a === 'part-det') {
      this.isPayment = false;
      this.isConf = false;
      this.isEventReg = false;
      this.isPartDet = true;
    } else if (a === 'payment') {
      this.isConf = false;
      this.isEventReg = false;
      this.isPartDet = false;
      this.isPayment = true;
    } else if (a === 'conf') {
      this.isEventReg = false;
      this.isPartDet = false;
      this.isPayment = false;
      this.isConf = true;
    }
  }

  navigateToHome() {
    this.router.navigate(['/events-home']);
  }
}
