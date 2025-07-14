import { Component, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { SharedModule } from '../../shared.module';

@Component({
  selector: 'club-profile',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './club-profile.component.html',
  styleUrl: './club-profile.component.css',
})
export class ClubProfileComponent {
  isDropdownOpen: boolean = false;
  isGenInfo: boolean = true;
  isMngAndCoach: boolean = false;
  isMngAndCoachList: boolean = true;
  isMngAndCoachCard: boolean = false;
  isEvntAndBook: boolean = false;
  isEvntAndBookList: boolean = false;
  isEvntAndBookCard: boolean = true;
  isNewsAndMed: boolean = false;
  isNewsAndMedList: boolean = false;
  isNewsAndMedCard: boolean = true;
  isAddNewsAndMedPopupOpen: boolean = false;
  isSetting: boolean = false;
  isOptionsOpen: boolean = false;
  isSortOpen: boolean = false;
  isAddAlbum: boolean = false;

  constructor(private router: Router, private elementRef: ElementRef) { }

  handleTabsChange(a: any) {
    if (a === 1) {
      this.isGenInfo = true;
      this.isMngAndCoach = false;
      this.isEvntAndBook = false;
      this.isNewsAndMed = false;
      this.isSetting = false;
    } else if (a === 2) {
      this.isMngAndCoach = true;
      this.isEvntAndBook = false;
      this.isNewsAndMed = false;
      this.isSetting = false;
      this.isGenInfo = false;
    } else if (a === 3) {
      this.isEvntAndBook = true;
      this.isNewsAndMed = false;
      this.isSetting = false;
      this.isGenInfo = false;
      this.isMngAndCoach = false;
    } else if (a === 4) {
      this.isNewsAndMed = true;
      this.isSetting = false;
      this.isGenInfo = false;
      this.isMngAndCoach = false;
      this.isEvntAndBook = false;
    } else if (a === 5) {
      this.isSetting = true;
      this.isGenInfo = false;
      this.isMngAndCoach = false;
      this.isEvntAndBook = false;
      this.isNewsAndMed = false;
    }
  }

  handleDropdown(a: string) {
    if (a === 'open') {
      this.isDropdownOpen = true;
    } else if (a === 'close') {
      this.isDropdownOpen = false;
    }
  }

  handleMngAndCoachesView(a: any) {
    if (a === 'list') {
      this.isMngAndCoachCard = false;
      this.isMngAndCoachList = true;
    } else if (a === 'cards') {
      this.isMngAndCoachList = false;
      this.isMngAndCoachCard = true;
    }
  }

  handleEvntAndBookView(a: any) {
    if (a === 'list') {
      this.isEvntAndBookCard = false;
      this.isEvntAndBookList = true;
    } else if (a === 'cards') {
      this.isEvntAndBookList = false;
      this.isEvntAndBookCard = true;
    }
  }

  handleNewsAndMedView(a: any) {
    if (a === 'list') {
      this.isNewsAndMedCard = false;
      this.isNewsAndMedList = true;
    } else if (a === 'cards') {
      this.isNewsAndMedList = false;
      this.isNewsAndMedCard = true;
    }
  }

  toggleSortDropdown(): void {
    this.isSortOpen = !this.isSortOpen;
  }

  toggleItemDropdown(): void {
    this.isOptionsOpen = !this.isOptionsOpen;
  }

  toggleAddNewsAndMedPopup() {
    this.isDropdownOpen = false
    this.isAddNewsAndMedPopupOpen = !this.isAddNewsAndMedPopupOpen
  }

  toggleAddAlbumPopup() {
    this.isDropdownOpen = false
    this.isAddAlbum = !this.isAddAlbum
  }

  // closeSortDropdown(): void {
  //   this.isSortOpen = false;
  // }

  // @HostListener('document:click', ['$event'])
  // onClick(event: MouseEvent): void {
  //   if (!this.elementRef.nativeElement.contains(event.target)) {
  //     this.isSortOpen = false;
  //   }
  // }
}
