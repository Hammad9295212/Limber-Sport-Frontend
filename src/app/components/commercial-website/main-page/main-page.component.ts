import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {
  NgbCarousel,
  NgbCarouselModule,
  NgbSlideEvent,
  NgbSlideEventSource,
} from '@ng-bootstrap/ng-bootstrap';
import {SharedModule} from '../../../shared.module';
import {BannerComponent} from '../banner/banner.component';
import {Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {MainPageService} from './main-page.service';
import {SelectDropDownModule} from 'ngx-select-dropdown';
import {AngularToastifyModule, ToastService} from 'angular-toastify';
import {FindPlayerComponent} from "../../../shared/player/find-player/find-player.component";

declare var google: any;

@Component({
  selector: 'app-main-page',
  standalone: true,
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
  imports: [SharedModule, NgbCarouselModule, BannerComponent, SelectDropDownModule, AngularToastifyModule, FindPlayerComponent],
})
export class MainPageComponent implements OnInit, AfterViewInit {

  constructor(private router: Router, private fb: FormBuilder, private mainpageService: MainPageService, private _toastService: ToastService) {
  }

  images = ['carousel1.png', 'carousel1.png', 'carousel1.png'].map(
    (n) => `/assets/main-page/${n}`
  );
  @ViewChild('searchInput', {static: true}) searchInput!: ElementRef;

  playData: any
  locationData: any
  rolesData: any
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover: boolean = true;
  pauseOnFocus: boolean = false;
  showNavigationIndicators = true;
  showNavigationArrows = false;
  wrap = true;
  searchForm: any

  playConfig = {
    displayFn: (item: any) => {
      return item.name;
    },
    displayKey: "name",
    search: true,
    height: '200px',
    placeholder: 'Select sport',
    limitTo: 0,
    moreText: 'more',
    noResultsFound: 'No results found!',
    searchPlaceholder: 'Search',
    searchOnKey: 'name',
  };

  ngOnInit(): void {
    this.createForm()
    this.getPlayData()
  }

  ngAfterViewInit(): void {
    this.initializePlaceAutocomplete()
  }

  createForm() {
    this.searchForm = this.fb.group({
      role: ['', Validators.required],
      sport: [''],
      location: [''],
      distance: ['']
    });
  }

  private initializePlaceAutocomplete(): void {
/*
    const autocomplete = new google.maps.places.Autocomplete(this.searchInput.nativeElement);
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      console.log('Selected Place:', place);
      // You can extract the place details here
      this.searchForm.get('location').setValue(place.formatted_address)
    });*/
  }

  searchChange(event: any) {
    console.log(event.value.id)
    this.searchForm.get('sport').setValue(event.value.id)
  }


  // handleFindNow() {
  //   console.log(this.searchForm)
  //   if (this.searchForm.get('role').value === "") {
  //     this._toastService.error("Role must be selected");
  //   }
  //   if (this.searchForm.get('role').value === "Player") {
  //     this.router.navigate(['/players-list']);
  //   } else if (this.searchForm.get('role').value === "Coach") {
  //     this.router.navigate(['/coaches-list']);
  //   } else if (this.searchForm.get('role').value === "Club") {
  //     this.router.navigate(['/clubs-list']);
  //   } else if (this.searchForm.get('role').value === "Event") {
  //     this.router.navigate(['/events-list']);
  //   } else if (this.searchForm.get('role').value === "Facility") {
  //     this.router.navigate(['/facilities-list']);
  //   }
  // }

  handleFindNow() {
    const role = this.searchForm.get('role').value;
    const sport = this.searchForm.get('sport').value;
    const location = (document.getElementById('pac-input') as HTMLInputElement).value;
    const distance = this.searchForm.get('distance').value;

    const selRole = this.rolesData?.find((currentRole:any) => currentRole.id === Number(role));

    if (!selRole || selRole?.name === "") {
      this._toastService.error("Role must be selected");
      return;
    }

    const queryParams = {
      role_id: selRole?.id?.toString() || null,
      sport: sport || null,
      location: location || null,
      distance: distance || null,
    };

    console.log(queryParams);


    switch (selRole?.name) {
      case "Player":
        this.router.navigate(['/players-list'], {queryParams});
        break;
      case "Coach":
        this.router.navigate(['/coaches-list'], {queryParams});
        break;
      case "Club":
        this.router.navigate(['/clubs-list'], {queryParams});
        break;
      case "Event":
        this.router.navigate(['/events-list'], {queryParams});
        break;
      case "Facility":
        this.router.navigate(['/facilities-list'], {queryParams});
        break;
      default:
        this._toastService.error("Invalid role selected");
    }
  }


  getPlayData() {
    this.mainpageService.getPlayData().subscribe(
      (data) => {
        if (data.status === 200) {
          // console.log(data.data)
          this.playData = data.data;
          console.log(this.playData);
        } else {
          console.log("Get API Error")
        }
      }
    )

    this.mainpageService.getRolesData().subscribe(
      (data) => {
        if (data.status === 200) {
          let rolesDataRaw = data.data
          this.rolesData = rolesDataRaw.slice().reverse();
          console.log(this.rolesData);
        } else {
          console.log("Get API Error")
        }
      }
    )
  }

  @ViewChild('carousel', {static: true}) carousel: NgbCarousel;

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
}
