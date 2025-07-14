import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select'
import { Router } from '@angular/router';
import { LogoutService } from './header.service';
import { AngularToastifyModule, ToastService } from 'angular-toastify';
import {ManualToastService} from "../../../shared/ManualToastService";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSelectModule, MatFormFieldModule, AngularToastifyModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isUser: any;
  currentUser: any;
  logoutPopup: boolean = false;

  constructor(
    private router: Router,
    private logoutService: LogoutService,
    private _toastService: ToastService,
    protected toastService: ManualToastService,
  ) {

  }

  ngOnInit(): void {
    const user = localStorage.getItem('token')
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      this.currentUser = JSON.parse(userData);
      console.log(this.currentUser);
    }
    if (user) {
      this.isUser = user;
    } else {
      console.log('User not Logged in')
    }
  }

  handleLogout() {
    localStorage.clear();
    this.toastService.clear();
    this.logoutService.logoutUser().subscribe((
      (data) => {
        console.log(data);
        if (data.status === 200) {
          this._toastService.success(data.message);
          this.router.navigate(['/login']);
        } else {
          this._toastService.error(data.message);
        }
      }
    ))

  }

  handleLogoutPopup() {
    this.logoutPopup = !this.logoutPopup
  }

  navigateToHomePage() {
    this.router.navigate(['/home'])
  }
  navigateToAboutUsPage(){
    this.router.navigate(['/about-us'])
  }
  navigateToSignUp() {
    this.router.navigate(['/sign-up'])
  }
  navigateToUniSportPage() {
    this.router.navigate(['/university-sports'])
  }
  navigateToCorpSportPage() {
    this.router.navigate(['/corporate-sports'])
  }
  navigateToHowItWorksPage() {
    this.router.navigate(['/how-it-works'])
  }
  navigateToContactPage() {
    this.router.navigate(['/contact-us'])
  }
  navigateToLoginPage() {
    this.router.navigate(['/login'])
  }

  navigateToPlayersPage() {
    this.router.navigate(['/players'])
  }
  navigateToClubsPage() {
    this.router.navigate(['/clubs'])
  }
  navigateToCoachesPage() {
    this.router.navigate(['/coaches'])
  }
  navigateToEventOragnisersPage() {
    this.router.navigate(['/event-organisers'])
  }
  navigateToFacilityProvidersPage() {
    this.router.navigate(['/facility-providers'])
  }
  navigateToPartnersAndAdvertisersPage() {
    this.router.navigate(['/partners-and-advertisers'])
  }

  protected readonly JSON = JSON;
}
