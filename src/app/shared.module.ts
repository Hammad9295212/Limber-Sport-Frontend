import { NgModule } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { OneDestinationComponent } from './components/commercial-website/one-destination/one-destination.component';
import { LocalPlayersComponent } from './components/commercial-website/local-players/local-players.component';
import { EasyBookComponent } from './components/commercial-website/easy-book/easy-book.component';
import { EnterLocalEventsComponent } from './components/commercial-website/enter-local-events/enter-local-events.component';
import { TopReviewsComponent } from './components/commercial-website/top-reviews/top-reviews.component';
import { MakeFriendsComponent } from "./components/commercial-website/make-friends/make-friends.component";
import { LimberCommunityComponent } from "./components/commercial-website/limber-community/limber-community.component";
import { HttpClientModule } from '@angular/common/http';
import { SignupService } from './components/shared/signup/signup.service';
import { AngularToastifyModule, ToastService } from 'angular-toastify';
import { LoginService } from './components/shared/login/login.service';
import { PlayersService } from './components/commercial-website/players-home/players.service';
import { ForgotPasswordService } from './components/shared/forgot-password/forgot-password.service';
import { LogoutService } from './components/shared/header/header.service';
import { CoachesService } from './components/commercial-website/coaches-home/coaches.service';
import { MainPageService } from './components/commercial-website/main-page/main-page.service';
import { LocalPlayersService } from './components/commercial-website/local-players/local-players.service';
import { SelectDropDownModule } from 'ngx-select-dropdown';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    HeaderComponent,
    FooterComponent,
    OneDestinationComponent,
    LocalPlayersComponent,
    EasyBookComponent,
    EnterLocalEventsComponent,
    TopReviewsComponent,
    MakeFriendsComponent,
    LimberCommunityComponent,
    HttpClientModule,
    AngularToastifyModule,
    SelectDropDownModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    RouterOutlet,
    CommonModule,
    HeaderComponent,
    FooterComponent,
    OneDestinationComponent,
    LocalPlayersComponent,
    EasyBookComponent,
    EnterLocalEventsComponent,
    TopReviewsComponent,
    MakeFriendsComponent,
    LimberCommunityComponent,

  ], providers: [
    SignupService,
    LoginService,
    ForgotPasswordService,
    PlayersService,
    LogoutService,
    ToastService,
    CoachesService,
    MainPageService,
    LocalPlayersService
  ]
})
export class SharedModule { }
