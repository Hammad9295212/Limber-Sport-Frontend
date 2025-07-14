import { Routes } from '@angular/router';
import { LoginComponent } from './components/shared/login/login.component';
import { SignupComponent } from './components/shared/signup/signup.component';
import { UniSportHomeComponent } from './components/commercial-website/university-sports/uni-sport-home/uni-sport-home.component';
import { UniSignupComponent } from './components/commercial-website/university-sports/uni-signup/uni-signup.component';
import { UniInformationComponent } from './components/commercial-website/university-sports/uni-information/uni-information.component';
import { SportClubComponent } from './components/commercial-website/university-sports/sport-club/sport-club.component';
import { ForPlayersComponent } from './components/commercial-website/university-sports/uni-sport-home/for-players/for-players.component';
import { ForClubsComponent } from './components/commercial-website/university-sports/uni-sport-home/for-clubs/for-clubs.component';
import { ForCoachesComponent } from './components/commercial-website/university-sports/uni-sport-home/for-coaches/for-coaches.component';
import { ForEventOrganizersComponent } from './components/commercial-website/university-sports/uni-sport-home/for-event-organizers/for-event-organizers.component';
import { ForPartnersAndAdvertisersComponent } from './components/commercial-website/university-sports/uni-sport-home/for-partners-and-advertisers/for-partners-and-advertisers.component';
import { ForFacilityProvidersComponent } from './components/commercial-website/university-sports/uni-sport-home/for-facility-providers/for-facility-providers.component';
import { PlayersHomeComponent } from './components/commercial-website/players-home/players-home.component';
import { PlayersListComponent } from './components/commercial-website/players-home/players-list/players-list.component';
import { PlayerDetailsComponent } from './components/commercial-website/players-home/player-details/player-details.component';
import { CoachesHomeComponent } from './components/commercial-website/coaches-home/coaches-home.component';
import { CoachesListComponent } from './components/commercial-website/coaches-home/coaches-list/coaches-list.component';
import { CoachDetailsComponent } from './components/commercial-website/coaches-home/coach-details/coach-details.component';
import { ClubsHomeComponent } from './components/commercial-website/clubs-home/clubs-home.component';
import { ClubsListComponent } from './components/commercial-website/clubs-home/clubs-list/clubs-list.component';
import { ClubDetailsComponent } from './components/commercial-website/clubs-home/club-details/club-details.component';
import { CoachBookingDetailsComponent } from './components/commercial-website/coach-booking-details/coach-booking-details.component';
import { EventsOrCompetitionsHomeComponent } from './components/commercial-website/events-or-competitions-home/events-or-competitions-home.component';
import { EventsOrCompetitionsListComponent } from './components/commercial-website/events-or-competitions-home/events-or-competitions-list/events-or-competitions-list.component';
import { EventOrCompetitionDetailsComponent } from './components/commercial-website/events-or-competitions-home/event-or-competition-details/event-or-competition-details.component';
import { EventsBookingDetailsComponent } from './components/commercial-website/events-booking-details/events-booking-details.component';
import { FacilitiesHomeComponent } from './components/commercial-website/facilities-home/facilities-home.component';
import { FacilitiesListComponent } from './components/commercial-website/facilities-home/facilities-list/facilities-list.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ClubProfileComponent } from './components/club-profile/club-profile.component';
import { EditPlayerProfileComponent } from './components/commercial-website/players-home/edit-player-profile/edit-player-profile.component';
import { ClubCoachesComponent } from './components/club-coaches/club-coaches.component';
import { ClubEventsComponent } from './components/club-events/club-events.component';
import { CreateEventComponent } from './components/club-events/create-event/create-event.component';
import { ForgotPasswordComponent } from './components/shared/forgot-password/forgot-password.component';
import { ClubMessagesComponent } from './components/club-messages/club-messages.component';
import { AboutUsComponent } from './components/commercial-website/about-us/about-us.component';
import { EditCoachProfileComponent } from './components/commercial-website/coaches-home/edit-coach-profile/edit-coach-profile.component';
import {NotificationsComponent} from "./pages/user/notifications/notifications.component";
import {SportConnectionsComponent} from "./pages/user/sport-connections/sport-connections.component";
import {SettingsComponent} from "./pages/user/settings/settings.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./layouts/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'university',
        loadChildren: () =>
          import(
            './components/commercial-website/commercial-website.module'
          ).then((m) => m.CommercialWebsiteModule),
      },

      {
        path: ' ',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
  {
    path: 'sign-up',
    component: SignupComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'contact-us',
    component: SportClubComponent,
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
  },
  {
    path: 'university-sports',
    component: UniInformationComponent,
  },
  {
    path: 'corporate-sports',
    component: UniSignupComponent,
  },
  {
    path: 'how-it-works',
    component: UniSportHomeComponent,
  },

  {
    path: 'players',
    component: ForPlayersComponent,
  },
  {
    path: 'clubs',
    component: ForClubsComponent,
  },
  {
    path: 'coaches',
    component: ForCoachesComponent,
  },
  {
    path: 'event-organisers',
    component: ForEventOrganizersComponent,
  },
  {
    path: 'facility-providers',
    component: ForFacilityProvidersComponent,
  },
  {
    path: 'partners-and-advertisers',
    component: ForPartnersAndAdvertisersComponent,
  },
  {
    path: 'players-home',
    component: PlayersHomeComponent,
  },
  {
    path: 'players-list',
    component: PlayersListComponent,
  },
  {
    path: 'player-details/:id',
    component: EditPlayerProfileComponent,
    // component: PlayerDetailsComponent,
  },
  {
    path: 'notifications',
    component: NotificationsComponent,
  },
  {
    path: 'my-connections',
    component: SportConnectionsComponent,
  },
  {
    path: 'edit-player/:id',
    component: EditPlayerProfileComponent,
  },
  {
    path: 'coaches-home',
    component: CoachesHomeComponent,
  },
  {
    path: 'coaches-list',
    // component: PlayersListComponent,
    component: CoachesListComponent,
  },
  {
    path: 'coach-details/:id',
    component: CoachDetailsComponent,
  },
  {
    path: 'edit-coach/:id',
    component: EditCoachProfileComponent,
  },

  {
    path: 'clubs-home',
    component: ClubsHomeComponent,
  },
  {
    path: 'clubs-list',
    component: ClubsListComponent,
  },
  {
    path: 'club-details/:id',
    component: ClubDetailsComponent,
  },


  {
    path: 'coach-booking-details',
    component: CoachBookingDetailsComponent,
  },

  {
    path: 'events-home',
    component: EventsOrCompetitionsHomeComponent,
  },
  {
    path: 'events-list',
    component: EventsOrCompetitionsListComponent,
  },
  {
    path: 'event-details',
    component: EventOrCompetitionDetailsComponent,
  },
  {
    path: 'event-booking-details',
    component: EventsBookingDetailsComponent,
  },

  {
    path: 'facilities-home',
    component: FacilitiesHomeComponent,
  },

  {
    path: 'facilities-list',
    component: FacilitiesListComponent,
  },

  {
    path: 'landing-page',
    component: LandingPageComponent,
  }, {
    path: 'club-profile',
    component: ClubProfileComponent,
  },
  {
    path: 'club-coaches',
    component: ClubCoachesComponent,
  },
  {
    path: 'club-events',
    component: ClubEventsComponent,
  },
  {
    path: 'create-club-events',
    component: CreateEventComponent,
  },
  {
    path: 'club-messages',
    component: ClubMessagesComponent,
  },


  {
    path: '**',
    redirectTo: 'home',
  },
];
