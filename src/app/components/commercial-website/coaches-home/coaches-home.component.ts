import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgbCarouselModule, NgbCarousel, NgbSlideEvent, NgbSlideEventSource} from '@ng-bootstrap/ng-bootstrap';
import {SharedModule} from '../../../shared.module';
import {BannerComponent} from '../banner/banner.component';
import {Router} from '@angular/router';
import {MainPageService} from "../main-page/main-page.service";
import {PlayercardComponent} from "../../../shared/player/playercard/playercard.component";
import {PlayersService} from "../players-home/players.service";

declare let google: any

@Component({
  selector: 'app-coaches-home',
  standalone: true,
  imports: [SharedModule, NgbCarouselModule, BannerComponent, PlayercardComponent],
  templateUrl: './coaches-home.component.html',
  styleUrl: './coaches-home.component.css'
})

export class CoachesHomeComponent implements OnInit, AfterViewInit {

  canEditProfile: any = false;
  extra: any = {};
  sportsData: any = [];
  queryParams: any = {
    rating: '',
    distance: '',
  };
  @ViewChild('searchInput', {static: true}) searchInput!: ElementRef;


  constructor(
    private router: Router,
    private mainpageService: MainPageService,
    private playersService: PlayersService
  ) {

  }

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover: boolean = true;
  pauseOnFocus: boolean = false;
  showNavigationIndicators = true;
  showNavigationArrows = false;
  wrap = true;

  @ViewChild('carousel', {static: true}) carousel: NgbCarousel;

  ngOnInit() {
    this.playersService.getPlayData().subscribe(
      (data: any) => {
        if (data?.success === true && data?.status === 200) {
          this.sportsData = data?.data
          console.log(this.sportsData);
        } else {
          console.log("Get API Not Successful", data)
        }
      });
    this.onGetFilterData({role_id: 4});
  }

  ngAfterViewInit() {

  }

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
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

  handleCoachesListPage() {
    // this.router.navigate(['/coaches-list'])
    const queryParams: any = {'role_id': '4'};
    this.router.navigate(['/coaches-list'], {queryParams});

  }

  async onGetFilterData(queryParams: any, shouldScroll = true, cancelBarHide = false) {
    if (this.extra.isStoppedFetching) {
      return;
    }
    const obj: any = {};
    for (const key in queryParams) {
      if (key && queryParams[key]) {
        obj[key] = queryParams[key];
      }
    }
    const player = this.playerType();
    this.mainpageService.onGet(player?.endPoint, obj).subscribe((data) => {
      let mainData = Array.isArray(data['data']) ? data['data'] : data['data']?.data;
      mainData = [...mainData] || [];
      if (obj?.latitude && obj?.longitude) {

        const referenceCoordinates = {
          latitude: Number(obj.latitude),
          longitude: Number(obj.longitude),
        };

        if (isNaN(referenceCoordinates.latitude) || isNaN(referenceCoordinates.longitude)) {
          console.error('Invalid reference coordinates:', referenceCoordinates);
          return;
        }

        for (let i = 0; i < mainData.length; i++) {
          const player = mainData[i];
          const playerCoordinates = {
            latitude: Number(player?.player?.latitude),
            longitude: Number(player?.player?.longitude),
          };
          if (!isNaN(playerCoordinates.latitude) && !isNaN(playerCoordinates.longitude)) {
            const distance = this.calculateDistance(playerCoordinates, referenceCoordinates);
            player.distanceFromReference = distance?.toFixed(2);
          }
        }
      }
      this.extra.coachListData = mainData;
      this.extra.coachListDataBackup = mainData;
      console.log(this.extra.coachListData);
      if (shouldScroll) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
      // this.isCoachesCard = true;
    });
  }

  initializePlaceAutocomplete(ev: any): void {
    const searchTerm = ev?.target ? ev?.target?.value : ev;
    if (searchTerm?.length < 1) {
      this.extra.showSuggestions = false;
      this.extra.placeSuggesiton = [];
      return;
    }
    if (!this.extra.placeSuggesiton) {
      this.extra.placeSuggesiton = [];
    }
    const autocompleteService = new google.maps.places.AutocompleteService();
    const suggestions: any[] = []; // Array to store suggestions
    const request = {
      input: searchTerm,
      types: ['geocode']
    };
    autocompleteService.getPlacePredictions(request, (predictions: any[], status: any) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
        predictions.forEach((prediction) => {
          suggestions.push(prediction.description);
        });
        console.log(`----------------------`);
        console.log(suggestions);
        this.extra.placeSuggesiton = suggestions;
        this.extra.showSuggestions = this.extra.placeSuggesiton?.length > 0;
      } else {
        console.error('Autocomplete service failed:', status);
      }
    });
  }

  playerType(): any {
    const role_id = Number('4');
    if (!role_id || isNaN(role_id)) {
      return;
    }
    let obj: any = {
      role_id
    }
    switch (role_id) {
      case 1:
        obj.heading = 'Limber for Players';
        obj.desc = 'TIME TO LIMBER UP, GET MORE ACTIVE, AND FIND LOCAL PLAYERS JUST LIKE YOU!';
        obj.endPoint = 'api/v1/search-users'
        break;
      case 4:
        obj.heading = 'Be Coached by the best';
        obj.desc = 'CHOOSE FROM OUR NETWORK OF RATED SPORTS COACHES TO YOU OR YOUR SCHOOL, UNIVERSITY OR CLUB TEAM';
        obj.endPoint = 'api/v1/coach-list';
        break;
    }
    return obj;
  }

  calculateDistance = (
    coord1: { latitude: number; longitude: number },
    coord2: { latitude: number; longitude: number }
  ): number => {
    const R = 3958.8;
    const dLat = (coord2.latitude - coord1.latitude) * (Math.PI / 180);
    const dLon = (coord2.longitude - coord1.longitude) * (Math.PI / 180);
    const lat1 = coord1.latitude * (Math.PI / 180);
    const lat2 = coord2.latitude * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

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

  async handleFindNow() {
    const location = this.queryParams.location;
    let queryParams: any = {
      role_id: 4,
      location: location || null,
      distance: this.queryParams.distance || null,
    };
    queryParams.sport = this.queryParams.sport || null;
    const loc_data = this.queryParams.location;
    if (loc_data) {
      const coordinates = await this.getCoordinatesFromAddress(loc_data);
      if (coordinates) {
        queryParams = {
          ...queryParams,
          ...coordinates
        }
      }
    }
    for (const key in queryParams) {
      if (
        !queryParams[key] ||
        queryParams[key] === 'undefined'
      ) {
        delete queryParams[key];
      }
    }
    this.router.navigate(['/coaches-list'], {queryParams});
  }


  getCoordinatesFromAddress(address: string): Promise<{ latitude: number; longitude: number } | null> {
    return new Promise((resolve, reject) => {
      if (!address) {
        reject('Address is required to get coordinates.');
        return;
      }

      const geocoder = new google.maps.Geocoder();

      geocoder.geocode({address}, (results: any, status: any) => {
        if (status === google.maps.GeocoderStatus.OK && results[0]) {
          const location = results[0].geometry.location;
          resolve({latitude: location.lat(), longitude: location.lng()});
        } else {
          console.error('Geocoding service failed:', status);
          reject(`Failed to get coordinates: ${status}`);
        }
      });
    });
  }


}
