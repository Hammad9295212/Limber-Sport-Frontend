import {AfterViewInit, Component, ElementRef, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NgForOf} from "@angular/common";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {SharedModule} from "../../../shared.module";
import {MainPageService} from "../../../components/commercial-website/main-page/main-page.service";
import {Router} from "@angular/router";
import {ManualToastService} from "../../ManualToastService";
import {NgbToast} from "@ng-bootstrap/ng-bootstrap";
import {PlayersService} from "../../../components/commercial-website/players-home/players.service";

declare let google: any;

const ToastTypes: any = {
  SUCCESS: 'bg-success text-light',
  DANGER: 'bg-danger text-light'
};

@Component({
  selector: 'app-find-player',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    SharedModule,
    NgbToast
  ],
  templateUrl: './find-player.component.html',
  styleUrl: './find-player.component.css'
})
export class FindPlayerComponent implements OnInit, AfterViewInit {

  searchForm: any;
  rolesData: any;
  playData: any;
  abilityData: any = [];
  @Input() selectRole: any;
  @ViewChild('searchInput', {static: true}) searchInput!: ElementRef;


  constructor(
    private mainpageService: MainPageService,
    // private _toastService: ToastService,
    private router: Router,
    private fb: FormBuilder,
    protected _toastService: ManualToastService,
    private playersService: PlayersService
  ) {
  }

  ngOnInit() {
    this.getPlayData();
    this.createForm();
  }

  ngAfterViewInit() {
    this.initializePlaceAutocomplete();
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

    const autocomplete = new google.maps.places.Autocomplete(this.searchInput.nativeElement);
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      console.log('Selected Place:', place);
      // You can extract the place details here
      this.searchForm.get('location').setValue(place.formatted_address)
    });
  }

  getPlayData() {
    this.playersService.getAbilityData().subscribe(
      data => {
        if (data?.success === true && data?.status === 200) {
          // console.log("Get API Successful", data)
          // console.log(data.data)
          this.abilityData = data?.data;
          console.log(this.abilityData);
        }
      });
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
          let player: any = '';
          if (this.selectRole) {
            player = this.rolesData.find((role: any) => role.id === this.selectRole);
            player = player?.id?.toString();
          }
          // this.searchForm.set('role', player);
          this.searchForm.get('role').setValue(player)
        } else {
          console.log("Get API Error")
        }
      }
    )
  }

  async handleFindNow() {
    const role = this.searchForm.get('role').value;
    const sport = this.searchForm.get('sport').value;
    const location = (document.getElementById('pac-input') as HTMLInputElement).value;
    const distance = this.searchForm.get('distance').value;

    const selRole = this.rolesData?.find((currentRole:any) => currentRole.id === Number(role));


    if (!selRole || selRole?.name === "") {
      this.showToastMsg(`Role must be selected`, ToastTypes.DANGER);
      return;
    }

    /* if (this.selectRole) {
       if (!sport || sport === "") {
         this.showToastMsg(`Ability must be selected`, ToastTypes.DANGER);
         return;
       }
     }*/

    let queryParams: any = {
      role_id: selRole?.id?.toString() || null,
      location: location || null,
      distance: distance || null,
    };

    if (this.selectRole) {
      queryParams.ability_id = sport || null;
    } else {
      queryParams.sport = sport || null;
    }

    const loc_data = (document.getElementById('pac-input') as HTMLInputElement)?.value;
    if (loc_data) {
      const coordinates = await this.getCoordinatesFromAddress(loc_data);
      if (coordinates) {
        queryParams = {
          ...queryParams,
          ...coordinates
        }
      }
    }

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
        this.showToastMsg("Invalid role selected", ToastTypes.DANGER);
    }
  }

  showToastMsg(msg: any, type: any = ToastTypes.SUCCESS) {
    this._toastService.show(msg, { classname: type, delay: 3000 });
  }

  isTemplate(toast: any) {
    return toast.textOrTpl instanceof TemplateRef;
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
