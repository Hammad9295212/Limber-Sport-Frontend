import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedModule } from '../../shared.module';
import { event } from 'jquery';

@Component({
  selector: 'club-messages',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './club-messages.component.html',
  styleUrl: './club-messages.component.css',
})
export class ClubMessagesComponent implements OnInit {
  isDropdownOpen: boolean = false;
  isOptionsOpen: boolean = false;
  isContactsOpen: boolean;
  isMessageOpen: boolean;
  screenWidth: number;
  screenHeight: number;

  constructor(private router: Router, private elementRef: ElementRef) { }

  ngOnInit() {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.displayDivs()
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event: any) {
    this.screenWidth = event.target.innerWidth;
    this.screenHeight = event.target.innerHeight;

    // Call a function or emit an event when the screen size changes
    this.displayDivs()
  }

  displayDivs() {
    if (this.screenWidth > 640) {
      this.isContactsOpen = true;
      this.isMessageOpen = true
    } else if (this.screenWidth < 640) {
      this.isMessageOpen = false;
      this.isContactsOpen = true;
    }
  }

  handleDropdown(a: string) {
    if (a === 'open') {
      this.isDropdownOpen = true;
    } else if (a === 'close') {
      this.isDropdownOpen = false;
    }
  }

  toggleItemOptions(): void {
    this.isOptionsOpen = !this.isOptionsOpen;
  }

  handleChangeDialogBox = (a: any) => {
    if (a === 'message') {
      this.isContactsOpen = false;
      this.isMessageOpen = true;
    } else if (a === 'contacts') {
      this.isMessageOpen = false;
      this.isContactsOpen = true;
    }
  }

}
