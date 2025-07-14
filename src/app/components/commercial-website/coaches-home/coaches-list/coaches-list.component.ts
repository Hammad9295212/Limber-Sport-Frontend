import { CommonModule } from '@angular/common';
import {Component, ElementRef, TemplateRef, ViewChild} from '@angular/core';
import { SharedModule } from '../../../../shared.module';
import {ActivatedRoute, Router} from '@angular/router';
import { CoachesService } from '../coaches.service';
import {FeaturedComponent} from "../../../../shared/player/featured/featured.component";
import {PlayersService} from "../../players-home/players.service";
import {MainPageService} from "../../main-page/main-page.service";
import {ManualToastService} from "../../../../shared/ManualToastService";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PlayercardComponent} from "../../../../shared/player/playercard/playercard.component";
import {Header2Component} from "../../../shared/header2/header2.component";


declare var google: any;

const ToastTypes: any = {
  SUCCESS: 'bg-success text-light',
  DANGER: 'bg-danger text-light'
};

@Component({
  selector: 'app-coaches-list',
  standalone: true,
  imports: [SharedModule, CommonModule, FeaturedComponent, PlayercardComponent, Header2Component],
  templateUrl: './coaches-list.component.html',
  styleUrl: './coaches-list.component.css'
})
export class CoachesListComponent {

  coachListData: any;
  coachListDataBackup: any;
  rolesData: any
  sportsData: any[];
  extra: any = {
    sportsData: [],
    rolesData: [],
    displayedSports: [],
    abilityData: [],
    isStoppedFetching: false,
    query: {},
    pagination: {
      perPage: 8,
      activePagination: 1
    }
  };
  placeSuggesiton: any = [];

  @ViewChild('searchInput', {static: true}) searchInput!: ElementRef;
  searchTerm: any = '';
  abilityData: any
  genderData: any
  isCoachesList: boolean = true;
  isCoachesCard: boolean = false;
  displayedSports: any[]; // Items to be shown initially
  itemsPerPage = 10; // Number of items to show initially
  currentIndex = 0;
  roleValue: string;
  sportValue: string;
  abilityValue: string;
  location: string;
  distance: string;
  price: string;
  queryParams: any = {};
  canShowBar = false;
  currentUser: any = false;


  constructor(
    private router: Router,
    private playersService: PlayersService,
    private route: ActivatedRoute,
    private mainpageService: MainPageService,
    protected toastService: ManualToastService,
    protected modalService: NgbModal,
  ) {
  }

  ngOnInit(): void {
    this.getVariousData();
    this.route.queryParams.subscribe(params => {
      this.roleValue = params['role_id'];
      this.sportValue = params['sport'];
      this.location = params['location'];
      this.distance = params['distance'] || '0';
      const ability_id = params['ability_id'];
      const latitude = params['latitude'];
      const longitude = params['longitude'];
      this.queryParams = {
        role_id: Number(this.roleValue) || null,
        sport: this.sportValue || null,
        play_id: this.sportValue || null,
        location: this.location || null,
        distance: this.distance || null,
      };
      if (ability_id) {
        this.queryParams.ability_id = ability_id;
      }
      if (latitude) {
        this.queryParams.latitude = latitude;
      }
      if (longitude) {
        this.queryParams.longitude = longitude;
      }
      this.onGetFilterData(this.queryParams, true);
    });
    this.onGetCurrentUser();
  }

  ngAfterViewInit(): void {

  }

  onGetCurrentUser() {
    const token = localStorage.getItem('token');
    if (!token) {
      // alert('Please login again to continue');
      return;
    }
    let currentUserID: any;
    let currentUser: any = localStorage.getItem('currentUser');
    if (currentUser) {
      currentUser = JSON.parse(currentUser);
      currentUserID = currentUser?.data[0] ? currentUser?.data[0]?.id : currentUser?.data?.id;
    }
    this.onGetPlayerDetail(token, currentUserID);
    // this.currentUser = token;
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
    console.log(player);
    this.mainpageService.onGet(player?.endPoint, obj).subscribe((data) => {
      let mainData = Array.isArray(data['data']) ? data['data'] : data['data']?.data;
      mainData = [...mainData] || [];
      this.extra.pagination.total = mainData?.length || 0;
      this.extra.pagination.paginationButtons = Math.ceil(mainData?.length / this.extra.pagination.perPage); // logic problem need calculate total buttons to be renders
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
      this.coachListData = mainData;
      this.coachListDataBackup = mainData;
      console.log(this.coachListDataBackup);
      delete this.extra.pagination.data;
      if (this.canShowBar) {
        if (!cancelBarHide) {
          this.hideFilterBar();
        }
      } else {
        this.canShowBar = true;
      }
      if (shouldScroll) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
      // this.isCoachesCard = true;
    });
  }

  hideFilterBar() {
    (document.getElementById('toggle-sidebar')?.click())
  }

  handleCoachesView(a: any) {
    if (a === 'list') {
      this.isCoachesCard = false;
      this.isCoachesList = true
    } else if (a === 'card') {
      this.isCoachesList = false;
      this.isCoachesCard = true
    }
  }

  // handlePlayerDetailsView(a: any) {
  //   // console.log(a)
  //   this.router.navigate([`/player-details/${a}`])
  // }
  getTruncatedTextByWords(text: string, wordLimit: number = 10): string {
    if (!text) return '';

    // Split the text into words
    const words = text.split(' ');

    // If the number of words is less than or equal to the limit, return the original text
    if (words.length <= wordLimit) return text;

    // Join the first 'wordLimit' words and add ellipsis
    return words.slice(0, wordLimit).join(' ') + '...';
  }

  handleCoachDetailsView(id: any) {
    this.router.navigate([`/edit-coach/${id}`]);
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

  loadMoreItems() {
    const reach = (this.currentIndex + this.itemsPerPage);
    this.displayedSports = this.sportsData.slice(0, reach);
    this.currentIndex += this.itemsPerPage;
  }

  loadLessItems() {
    let reach = (this.currentIndex - this.itemsPerPage);
    if (reach <= 0) {
      reach = this.itemsPerPage;
    }
    this.displayedSports = this.sportsData.slice(0, reach);
    this.currentIndex -= this.itemsPerPage;
    if (this.currentIndex <= 0) {
      this.currentIndex = this.itemsPerPage;
    }
  }

  getVariousData() {
    try {
      this.playersService.getPlayData().subscribe(
        data => {
          if (data?.success === true && data?.status === 200) {
            // console.log("Get API Successful", data)
            // console.log(data.data)
            this.sportsData = data?.data
            this.extra.sportsData = data?.data
            const nextItems = data?.data.slice(this.currentIndex, this.currentIndex + this.itemsPerPage);
            this.displayedSports = [...nextItems];
            this.currentIndex += this.itemsPerPage;
            setTimeout(() => {
              const ele: any = document.getElementById(this.queryParams.sport);
              console.log(ele);
              if (ele) {
                ele.checked = true;
              }
            }, 1000);
          } else {
            console.log("Get API Not Successful", data)
          }
        })
      this.playersService.getRolesData().subscribe(
        data => {
          if (data?.success === true && data?.status === 200) {
            // console.log("Get API Successful", data)
            // console.log(data.data)
            this.rolesData = data?.data.reverse();
            this.extra.rolesData = this.rolesData;
            console.log(this.rolesData);
            setTimeout(() => {
              const ele: any = document.getElementById(this.queryParams.role_id);
              if (ele) {
                ele.checked = true;
              }
            }, 1000);
          } else {
            console.log("Get API Not Successful", data)
          }
        })
      this.playersService.getGenderList().subscribe(
        data => {
          if (data?.success === true && data?.status === 200) {
            // console.log("Get API Successful", data)
            // console.log(data.data)
            this.genderData = data?.data
          } else {
            console.log("Get API Not Successful", data)
          }
        })
      this.playersService.getAbilityData().subscribe(
        data => {
          if (data?.success === true && data?.status === 200) {
            // console.log("Get API Successful", data)
            // console.log(data.data)
            this.abilityData = data?.data
            this.extra.abilityData = data?.data
            setTimeout(() => {
              const ele: any = document.getElementById(this.queryParams.ability_id);
              console.log(ele);
              if (ele) {
                ele.checked = true;
              }
            }, 1000);
          } else {
            console.log("Get API Not Successful", data)
          }
        })
    } catch (e: any) {
      console.log(e);
    }
  }

  getbannerImage() {
    const role_id = Number(this.queryParams?.role_id);
    let img: any;
    if (role_id === 1) {
      img = `url('/assets/WEBSITE\\ -\\ HOW\\ IT\\ WORKS\\ FOR\\ IMAGES/For\\ Players/section-01-bg.png')`;
    }
    if (role_id === 4) {
      img = `url('../../../../../assets/WEBSITE\\ -\\ HOW\\ IT\\ WORKS\\ FOR\\ IMAGES/For\\ Coaches/section-01-bg-03.png')`;
    }
    return img;
  }

  onFilterData(ev: any, key: any, cancelScroll = false, cancelBarHide = false) {
    let val = ev?.target ? ev?.target?.value : ev;
    if (key === 'location') {
      this.initializePlaceAutocomplete(ev);
    }
    if (val && val?.trim()?.length > 0) {
      if (Array.isArray(key)) {
        for (let i = 0; i < key?.length; i++) {
          this.queryParams[key[i]] = val;
        }
      } else {
        this.queryParams[key] = val;
      }
    } else {
      if (Array.isArray(key)) {
        for (let i = 0; i < key?.length; i++) {
          delete this.queryParams[key[i]];
        }
      } else {
        delete this.queryParams[key];
      }
    }
    const ele: any = document.getElementById(val);
    console.log(ele);
    if (ele) {

      ele.checked = true;
    }
    this.onGetFilterData(this.queryParams, cancelScroll ? false : (key !== 'distance'), cancelBarHide);
  }

  onFilter(ev: any) {
    this.searchTerm = ev?.target?.value;
    if (this.searchTerm?.length > 0) {
      this.coachListData = this.coachListDataBackup.filter((item: any) => {
        const searchTermLower = this.searchTerm.toLowerCase();
        const nameMatches = item.name.toLowerCase().indexOf(searchTermLower) > -1;
        let locationMatches = false;
        if (item.player && item.player.length > 0) {
          const location = item.player[0]?.location || '';
          const about_me = item.player[0]?.about_me || '';
          const age = item.player[0]?.age?.toString() || '';
          locationMatches = location.toLowerCase().indexOf(searchTermLower) > -1;
          if (!locationMatches) {
            locationMatches = about_me.toLowerCase().indexOf(searchTermLower) > -1;
            if (!locationMatches) {
              locationMatches = age.toLowerCase().indexOf(searchTermLower) > -1;
            }
          }
        }
        return nameMatches || locationMatches;
      });

    } else {
      this.onGetFilterData(this.queryParams);
    }
  }

  initializePlaceAutocomplete(ev: any): void {
    const searchTerm = ev?.target ? ev?.target?.value : ev;
    if (searchTerm?.length < 1) {
      this.extra.showSuggestions = false;
      this.placeSuggesiton = [];
      return;
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

        this.placeSuggesiton = suggestions;
        this.extra.showSuggestions = this.placeSuggesiton?.length > 0;
      } else {
        console.error('Autocomplete service failed:', status);
      }
    });
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

  async onPlayConnect(otherPlayer: any) {
    try {
      console.log(otherPlayer);
      const other_user_id = otherPlayer?.player[0]?.user_id || otherPlayer?.player?.user_id;
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
          (document?.getElementById('closeModal')?.click())
          this.showToastMsg('Connection request has been sent successfully', ToastTypes.SUCCESS);
          this.onGetFilterData(this.queryParams);
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
        // this.isCoachesCard = true;
      });
    } catch (e) {
      console.log('Could not connect');
      console.log(e);
    }
  }

  onClearFilter() {
    this.extra.isStoppedFetching = true;
    this.queryParams = {};
    this.distance = '0';
    this.sportValue = '';
    this.location = '';

    // Safely set the value of 'searchTerm' if the element exists
    const searchTermElement = document.getElementById('searchTerm') as HTMLInputElement;
    if (searchTermElement) {
      searchTermElement.value = '';
    }

    // Safely set the value of 'locationInput' if the element exists
    const locationInputElement = document.getElementById('locationInput') as HTMLInputElement;
    if (locationInputElement) {
      locationInputElement.value = '';
    }

    // Click the elements if they exist
    const clickElements = [
      'lookingFor0',
      'sportsSelection',
      'ability_idSelection',
      'ageRangeSelection',
      'tagsfields',
      'looking_for-clear'
    ];

    clickElements.forEach((id) => {
      const element = document.getElementById(id) as HTMLInputElement;
      if (element) {
        element.click();
      }
    });

    this.extra.isStoppedFetching = false;
    this.queryParams.role_id = 4;
    console.log(`-------------------------Clear Filter-`);
    console.log(this.queryParams);
    this.onGetFilterData({ role_id: 4 });
  }


  onLoadModal(data: any, content: any) {
    if (data?.connection_status === '1' || data?.connection_status === '2') {
      console.log(data)
      return;
    }
    this.extra.selPlayer = data;
    this.modalService.open(content, {centered: true})
  }

  localFilterSearch(term: any, key: any, subKey: any, slice = false) {
    term = term?.target ? term?.target?.value : '';
    if (!term || term?.trim()?.length < 1) {
      // @ts-ignore
      this[key] = this.extra[key];
      if (key === 'displayedSports') {
        this.displayedSports = this.extra.sportsData.slice(0, this.currentIndex);
      }
      return;
    }
    // @ts-ignore
    this[key] = this.extra[(key === 'displayedSports' ? 'sportsData' : key)]?.filter((selItem: any) => selItem[subKey]?.toLowerCase()?.indexOf(term) > -1);
    if (slice) {
      // @ts-ignore
      this[key] = this[key].slice(0, this.currentIndex)
    }
  }

  onSort(ev: any) {
    const searchTerm = ev?.target?.value;
    if (searchTerm?.length > 0) {
      if (searchTerm === "location") {
        // Sort the coachListDataBackup array by the location inside the player array
        this.coachListData = this.coachListDataBackup.sort((a: { player: { location: string; }[]; }, b: {
          player: { location: string; }[];
        }) => {
          const locationA = a.player[0]?.location?.toLowerCase() || "";
          const locationB = b.player[0]?.location?.toLowerCase() || "";

          if (locationA < locationB) return -1;
          if (locationA > locationB) return 1;
          return 0;
        });
      } else if (searchTerm === 'rating') {
        this.extra.query.tags = this.extra.query.tags || [];
        this.extra.query.tags.push('rating');

        this.queryParams.tags = this.extra.query.tags.join(', ');

        this.onGetFilterData(this.queryParams);
      }
    } else {
      this.onGetFilterData(this.queryParams);
    }
  }

  handleTagChange(tag: string, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.extra.query.tags = this.extra.query.tags || [];
    if (isChecked) {
      this.extra.query.tags.push(tag.toLowerCase());
    } else {
      const index = this.extra.query.tags.indexOf(tag.toLowerCase());
      if (index !== -1) {
        this.extra.query.tags.splice(index, 1);
      }
    }
    this.queryParams.tags = this.extra.query.tags.join(', ');
    this.onGetFilterData(this.queryParams);
  }

  onNavigateToPagination(nmbr: any) {
    this.extra.pagination.activePagination = nmbr;
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  async selectLocation(loc: string) {
    let coordinates;
    try {
      coordinates = await this.getCoordinatesFromAddress(loc);
    } catch (e) {
      console.log(e);
    }
    this.location = loc;
    this.queryParams.location = loc;
    if (coordinates) {
      this.queryParams = {
        ...this.queryParams,
        ...coordinates
      }
    }
    console.log(this.queryParams);
    this.onGetFilterData(this.queryParams, true, true);
    this.extra.showSuggestions = false;
  }

  onFindSport(ids: any) {
    let selSport;
    for (let i = 0; i < ids?.length; i++) {
      if (!selSport) {
        const id = ids[i]?.play?.id;
        selSport = this.sportsData.find(currentSport => currentSport?.id === id)?.name
      }
    }
    return selSport;
  }

  onGetSport(ids: any[]): string {
    let selSport = '';
    if (ids?.length) {
      for (let i = 0; i < ids.length; i++) {
        const id = ids[i]?.play?.id;
        const sportName = this.sportsData.find(currentSport => currentSport?.id === id)?.name;

        if (sportName) {
          selSport += (selSport ? ', ' : '') + sportName;
        }
      }
    }
    return selSport;
  }

  isTemplate(toast: any) {
    return toast.textOrTpl instanceof TemplateRef;
  }


  showToastMsg(msg: any, type: any = ToastTypes.SUCCESS) {
    this.toastService.show(msg, {classname: type, delay: 3000});
  }

  onGetPlayerDetail(token: any, user_id: any) {
    this.mainpageService.onGetUsingToken(`api/v1/get-coach-details`, {user_id}, token).subscribe((data) => {
      this.extra.playerDetailsData = data['data'];
      this.currentUser = this.extra.playerDetailsData;
    }, (err: any) => {
      console.log(err);
    });
  }

  calculateDistances = (
    coordinates: { latitude: number; longitude: number }[]
  ): { from: number; to: number; distance: number }[] => {
    const distances: { from: number; to: number; distance: number }[] = [];

    for (let i = 0; i < coordinates.length; i++) {
      for (let j = i + 1; j < coordinates.length; j++) {
        const distance = this.calculateDistance(coordinates[i], coordinates[j]);
        distances.push({
          from: i,
          to: j,
          distance,
        });
      }
    }

    return distances;
  };

  calculateDistance2 = (
    point1: { latitude: number; longitude: number },
    point2: { latitude: number; longitude: number }
  ): number => {
    const R = 3958.8; // Radius of Earth in miles
    const lat1 = point1.latitude * (Math.PI / 180);
    const lon1 = point1.longitude * (Math.PI / 180);
    const lat2 = point2.latitude * (Math.PI / 180);
    const lon2 = point2.longitude * (Math.PI / 180);

    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in miles
  };


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

  playerType(): any {
    const role_id = Number(this.queryParams?.role_id);
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

  toggleAccordion(key: any) {
    this.extra[key] = !this.extra[key]
  }


}
