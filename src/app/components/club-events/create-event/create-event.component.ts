import { Component, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { SharedModule } from '../../../shared.module';

@Component({
  selector: 'create-event',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css',
})
export class CreateEventComponent {
  tabs = [true, false, false, false, false, false, false, false];
  currentTab: number = 1;
  sponsorLogoPopup: boolean = false;

  constructor(
    private router: Router
  ) {
  }

  handleTabChange(a: number) {
    this.tabs.fill(false);

    this.tabs[a - 1] = true;

    this.currentTab = a;
  }

  toggleSponsorLogoPopup() {
    this.sponsorLogoPopup = !this.sponsorLogoPopup
  }

  handleNavigateToClubEvents() {
    this.router.navigate(['/club-events'])
  }
}
