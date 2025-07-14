import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedModule } from '../../shared.module';

@Component({
  selector: 'club-events',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './club-events.component.html',
  styleUrl: './club-events.component.css'
})
export class ClubEventsComponent {
  isDropdownOpen: boolean = false;
  isUpcomingEvents: boolean = false;
  isPastEvents: boolean = false;
  isPastEventsList: boolean = true;
  isPastEventsCard: boolean = false
  isCancelledEvents: boolean = false;
  isCancelledEventsList: boolean = true;
  isCancelledEventsCard: boolean = false
  isDraftEvents: boolean = true;
  isDraftEventsList: boolean = false;
  isDraftEventsCard: boolean = true;
  isDraftOptionsOpen: boolean = false;
  isAddNewsAndMedPopupOpen: boolean = false;
  isAddAlbum: boolean = false;

  constructor(
    private router: Router
  ) {
  }

  handleTabsChange(a: any) {
    if (a === 1) {
      this.isUpcomingEvents = true;
      this.isPastEvents = false;
      this.isCancelledEvents = false;
      this.isDraftEvents = false;
    } else if (a === 2) {
      this.isPastEvents = true;
      this.isCancelledEvents = false;
      this.isDraftEvents = false;
      this.isUpcomingEvents = false;
    } else if (a === 3) {
      this.isCancelledEvents = true;
      this.isDraftEvents = false;
      this.isUpcomingEvents = false;
      this.isPastEvents = false;
    } else if (a === 4) {
      this.isDraftEvents = true;
      this.isUpcomingEvents = false;
      this.isPastEvents = false;
      this.isCancelledEvents = false;
    }
  }

  handleDropdown(a: string) {
    if (a === 'open') {
      this.isDropdownOpen = true;
    } else if (a === 'close') {
      this.isDropdownOpen = false;
    }
  }

  handlePastEventsView(a: string) {
    if (a === 'list') {
      this.isPastEventsCard = false;
      this.isPastEventsList = true;
    } else if (a === 'cards') {
      this.isPastEventsList = false;
      this.isPastEventsCard = true;
    }
  }


  handleCancelledEventsView(a: string) {
    if (a === 'list') {
      this.isCancelledEventsCard = false;
      this.isCancelledEventsList = true;
    } else if (a === 'cards') {
      this.isCancelledEventsList = false;
      this.isCancelledEventsCard = true;
    }
  }

  handleDraftsEventsView(a: string) {
    if (a === 'list') {
      this.isDraftEventsCard = false;
      this.isDraftEventsList = true;
    } else if (a === 'cards') {
      this.isDraftEventsList = false;
      this.isDraftEventsCard = true;
    }
  }

  toggleDraftItemDropdown() {
    this.isDraftOptionsOpen = !this.isDraftOptionsOpen
  }

  toggleAddNewsAndMedPopup() {
    this.isDropdownOpen = false
    this.isAddNewsAndMedPopupOpen = !this.isAddNewsAndMedPopupOpen
  }

  toggleAddAlbumPopup() {
    this.isDropdownOpen = false
    this.isAddAlbum = !this.isAddAlbum
  }



}
