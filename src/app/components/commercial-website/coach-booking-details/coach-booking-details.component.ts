import { Component } from '@angular/core';
import { SharedModule } from '../../../shared.module';

@Component({
  selector: 'app-coach-booking-details',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './coach-booking-details.component.html',
  styleUrl: './coach-booking-details.component.css'
})
export class CoachBookingDetailsComponent {
  isSessionDetails: boolean = true
  isPayment: boolean = false
  isConfirm: boolean = false

  navigate(a: string) {
    if (a === "session-details") {
      this.isConfirm = false
      this.isPayment = false
      this.isSessionDetails = true
    } else if (a === "payment") {
      this.isConfirm = false
      this.isSessionDetails = false
      this.isPayment = true
    } else if (a === "confirm") {
      this.isSessionDetails = false
      this.isPayment = false
      this.isConfirm = true
    }
  }
}
