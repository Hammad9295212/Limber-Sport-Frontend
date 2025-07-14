import { Component, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { SharedModule } from '../../shared.module';

@Component({
  selector: 'club-coaches',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './club-coaches.component.html',
  styleUrl: './club-coaches.component.css',
})
export class ClubCoachesComponent {
  isCoachesList: boolean = false;
  isDropdownOpen: boolean = false;

  constructor(private router: Router, private elementRef: ElementRef) { }

  handleDropdown(a: string) {
    if (a === 'open') {
      this.isDropdownOpen = true;
    } else if (a === 'close') {
      this.isDropdownOpen = false;
    }
  }

  handleCoachesListView(a: string) {
    if (a === 'list') {
      this.isCoachesList = true
    }
    else if (a === 'card') {
      this.isCoachesList = false
    }
  }
}
