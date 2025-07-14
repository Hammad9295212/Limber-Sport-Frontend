import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {NgbCarousel, NgbCarouselModule, NgbSlideEvent, NgbSlideEventSource} from '@ng-bootstrap/ng-bootstrap';
import {SharedModule} from '../../../shared.module';
import {BannerComponent} from '../banner/banner.component';
import {FindPlayerComponent} from "../../../shared/player/find-player/find-player.component";
import {MainPageService} from "../main-page/main-page.service";
import {PlayersService} from "./players.service";
import {PlayercardComponent} from "../../../shared/player/playercard/playercard.component";

const ToastTypes: any = {
  SUCCESS: 'bg-success text-light',
  DANGER: 'bg-danger text-light'
};

@Component({
  selector: 'app-players-home',
  standalone: true,
    imports: [SharedModule, NgbCarouselModule, BannerComponent, FindPlayerComponent, PlayercardComponent],
  templateUrl: './players-home.component.html',
  styleUrl: './players-home.component.css'
})
export class PlayersHomeComponent implements OnInit {

  images = ['carousel1.png', 'carousel1.png', 'carousel1.png'].map((n) => `/assets/main-page/${n}`);
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover: boolean = true;
  pauseOnFocus: boolean = false;
  showNavigationIndicators = true;
  showNavigationArrows = false;
  wrap = true;
  isPlayersListView: boolean = false;
  currentUser: any;
  nearPlayersData: any = [];
  activePlayersData: any = [];
  playerListData: any = [];
  sportsData: any = [];
  @ViewChild('carousel', {static: true}) carousel: NgbCarousel;


  constructor(
    private router: Router,
    private mainpageService: MainPageService,
    private playersService: PlayersService
  ) {
    this.onGetCurrentUser();
  }

  ngOnInit() {
    this.onGetData();
  }

  onGetData() {
    console.log(`-------------GAME-`);
    this.playersService.getPlayData().subscribe(
      (data: any) => {
        if (data?.success === true && data?.status === 200) {
          this.sportsData = data?.data

        } else {
          console.log("Get API Not Successful", data)
        }
      });
    const token = localStorage.getItem('token');
    this.mainpageService.onGetUsingToken('api/v1/top-users', {role_id: 1, tags: 'near'}, token).subscribe((data) => {
      if (Array.isArray(data?.data)) {
        this.nearPlayersData = data?.data;
      } else if (Array.isArray(data?.data?.data)) {
        this.nearPlayersData = data?.data?.data;
      } else {
        this.nearPlayersData = [];
      }
    });
    this.mainpageService.onGetUsingToken('api/v1/top-users', {role_id: 1, tags: 'activity'}, token).subscribe((data) => {
      if (Array.isArray(data?.data)) {
        this.activePlayersData = data?.data;
      } else if (Array.isArray(data?.data?.data)) {
        this.activePlayersData = data?.data?.data;
      } else {
        this.activePlayersData = [];
      }
    });
    this.mainpageService.onGetUsingToken('api/v1/top-users', {role_id: 1, tags: 'rating'}, token).subscribe((data) => {
      if (Array.isArray(data?.data)) {
        this.playerListData = data?.data;
      } else if (Array.isArray(data?.data?.data)) {
        this.playerListData = data?.data?.data;
      } else {
        this.playerListData = [];
      }
    });
  }

  onGetCurrentUser() {
    const token = localStorage.getItem('token');
    if (!token) {
      // alert('Please login again to continue');
      return;
    }
    this.currentUser = token;
  }

  returnImg(data: any) {
    let img;
    if (data?.player && Array.isArray(data?.player)) {
      img = data?.player[0]?.profile_image
    } else if (data?.player && typeof data?.player === 'object') {
      img = data?.player?.profile_image
    }
    if (!img) {
      img = '/assets/icons/default.jpg';
    }
    return img;
  }

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  async onPlayConnect(otherPlayer: any) {
    try {
      const other_user_id = otherPlayer?.player[0]?.id || otherPlayer?.player?.id;
      if (!other_user_id) {
        this.showToastMsg('No player found to connect', ToastTypes.DANGER);
        return;
      }
      const token = localStorage.getItem('token');
      if (!token) {
        this.showToastMsg('Please login again to continue', ToastTypes.DANGER);
        return;
      }
      let currentUser: any = localStorage.getItem('currentUser');
      if (!currentUser) {
        this.showToastMsg('You need to be logged in to continue', ToastTypes.DANGER);
        return;
      }
      currentUser = JSON.parse(currentUser);
      const user_type = 'player';
      const note = 'Be my connection';

      const queryParams = {
        other_user_id,
        user_type,
        note
      };
      console.log(queryParams);
      this.mainpageService.onPostUsingToken('api/v1/user-connection-request', queryParams, token).subscribe((data) => {
        console.log(data);
        if (data?.status === 200) {
          this.showToastMsg('Connection request has been sent successfully', ToastTypes.SUCCESS)
        } else {
          if (data?.message) {
            this.showToastMsg(data?.message, ToastTypes.DANGER);
          } else if (data?.errors && Array.isArray(data?.errors)) {
            for (let i = 0; i < data?.errors?.length; i++) {
              this.showToastMsg(data?.errors[i], ToastTypes.DANGER);
            }
          } else {
            this.showToastMsg('Something went wrong, please try again later', ToastTypes.DANGER);
          }
        }
        // this.isPlayersCard = true;
      });
    } catch (e) {
      console.log('Could not connect');
      console.log(e);
    }
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (
      this.unpauseOnArrow &&
      slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT ||
        slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
    ) {
      this.togglePaused();
    }
    if (
      this.pauseOnIndicator &&
      !slideEvent.paused &&
      slideEvent.source === NgbSlideEventSource.INDICATOR
    ) {
      this.togglePaused();
    }
  }

  navigateToHomePage() {
    this.router.navigate(['/home'])
  }

  handlePlayerView() {
    this.isPlayersListView = !this.isPlayersListView
  }

  handlePlayersListPage() {
    this.router.navigate(['/players-list'])
  }

  viewPlayerFilter() {
    const queryParams: any = {'role_id': '1'};
    this.router.navigate(['/players-list'], {queryParams});
  }

  showToastMsg(msg: any, type: any = ToastTypes.SUCCESS) {
    // this.toastService.show(msg, { classname: type, delay: 3000 });
  }

  handlePlayerDetailsView(id: any) {
    this.router.navigate([`/player-details/${id}`]);
  }

  getTruncatedTextByWords(text: string, wordLimit: number = 10): string {
    if (!text) return '';

    // Split the text into words
    const words = text.split(' ');

    // If the number of words is less than or equal to the limit, return the original text
    if (words.length <= wordLimit) return text;

    // Join the first 'wordLimit' words and add ellipsis
    return words.slice(0, wordLimit).join(' ') + '...';
  }

  onFindSport(ids: any) {
    let selSport;
    for (let i = 0; i < ids?.length; i++) {
      if (!selSport) {
        const id = ids[i]?.play?.id;
        selSport = this.sportsData.find((currentSport: any) => currentSport?.id === id)?.name
      }
    }
    return selSport;
  }


  checkItemsNotWithSports(items: any) {
    const allItems = [];
    for (let i = 0; i < items?.length; i++) {
      const player = items[i];
      if ((player?.sports || player?.sport)?.length) {
        allItems.push(player);
      }
    }
    return !allItems?.length ? 400 : 0
  }

}
