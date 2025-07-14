import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LoginService} from "../login/login.service";
import {ToastService} from "angular-toastify";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {SignupService} from "../signup/signup.service";
import {NgSelectModule} from "@ng-select/ng-select";
import {MainPageService} from "../../commercial-website/main-page/main-page.service";
/*import { APIServiceService } from 'projects/OnBoarding/src/app/services/apiservice.service';
import { DataExchangeService } from '../../../../services/data-exchange.service';
import { CommonService } from 'projects/OnBoarding/src/app/services/common/common.service';
import { MixpanelService } from 'projects/tools/src/lib/mixpanel.service';*/
declare const gapi: any;

const ToastTypes: any = {
  SUCCESS: 'bg-success text-light',
  DANGER: 'bg-danger text-light'
};

@Component({
  selector: 'app-google-sign-in',
  templateUrl: './google-sign-in.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    NgSelectModule,
    ReactiveFormsModule
  ],
  styleUrls: ['./google-sign-in.component.scss']
})

export class GoogleSignInComponent implements OnInit, AfterViewInit {
  // private clientId: string = '611129404915-rubutbbntutl45hakr5ndqahp2ac3orh.apps.googleusercontent.com';
  // private clientId: string = 'http://1032024019066-f1dm0bk2pf6rbl4d51k833oheqiuflui.apps.googleusercontent.com';
  // private clientId: string = 'http://1032024019066-e0kndlfpvstodar7ius6pdukfde1arkf.apps.googleusercontent.com';
  private clientId: string = '1032024019066-f1dm0bk2pf6rbl4d51k833oheqiuflui.apps.googleusercontent.com';
  @Output() onVerifyUserData = new EventEmitter<any>();
  imgPath: string = 'assets/images/';
  submitted: boolean = false;
  errorLog: any = [];
  MEEKCurrentUser: any = null;
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();
  private scope = [
    'profile',
    'email'
  ].join(' ');
  public auth2: any;
  extra: any = {
    loading: false
  }
  userData: any = {};
  rolesData: any;
  @Input() loginPage: any;
  countriesData: any = [];
  mobileMsg = '';


  constructor(private element: ElementRef,
              private loginService: LoginService,
              private _toastService: ToastService,
              private router: Router,
              private modalService: NgbModal,
              private signupService: SignupService,
              private mainService: MainPageService
  ) {
    // console.log('ElementRef: ', this.element);
  }

  ngOnInit() {
    this.getRoles();
    this.getCountries();
  }

  public googleInit() {
    /* this.MixpanelService.track('button_clicked', {
       page_path: window.location.pathname,
       page_url: window.location.href,
       hostname: window.location.hostname,
       component: 'Login - Google sign-in',
       date: new Date().toISOString()
     })*/
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: this.clientId,
        plugin_name: 'login',
        Client_Secret: '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',
        //Client_Secret: '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',
        // Client_Secret: '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',
        // Client_Secret: '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',
        cookiepolicy: 'single_host_origin',
        scope: this.scope

      });
      this.attachSignin(this.element.nativeElement.firstChild);
    });
  }

  public attachSignin(element: any) {
    this.auth2.attachClickHandler(element, {},
      (googleUser: any) => {

        let profile = googleUser.getBasicProfile();
        const userName = profile?.getName();
        this.userData = {
          'provider': 'google',
          'access_token': googleUser.getAuthResponse().access_token,
          first_name: userName?.split(' ')[0] || '',
          last_name: userName?.split(' ')[1] || '',
          name: userName,
          email: profile?.getEmail(),
          id: profile?.getId(),
          photoUrl: profile?.getImageUrl(),
        };
        // (document.getElementById('modalBtn')?.click())
        this.mainService.onGet(`api/auth/check-google-user`, { provider_id: profile?.getId(), email: this.userData?.email }).subscribe(data => {
          console.log(data);
          const userId = (data.data && data.data[0]) ? data?.data[0]?.id : data?.data?.id;

          if (data?.status === 200) {
            // this.onVerifyUserData.emit(data);
            localStorage.setItem("token", data.access_token);
            localStorage.setItem("currentUser", JSON.stringify(data));
            if (data.data[0].profile_type === "Player") {
              console.log('Player Logged in')
              this.showToastMsg('Player Logged in', ToastTypes.SUCCESS);
              // this._toastService.success('Player Logged in');
              setTimeout(() => {
                this.router.navigate([`/edit-player/${userId}`]);
              }, 1000);
            } else if (data.data[0].profile_type === "Coach") {
              console.log('Coach Logged in')
              this.showToastMsg('Coach Logged in', ToastTypes.SUCCESS);
              // this._toastService.success('Coach Logged in');
              this.router.navigate([`/edit-coach/${userId}`]);
            } else if (data.data[0].profile_type === "Club") {
              console.log('Club Loggin in')
              this.showToastMsg('Club Logged in', ToastTypes.SUCCESS);
              // this._toastService.success('Club Logged in');
              this.router.navigate([`/club-details/${userId}`]);
            } else {
              data.errors.map((a: string) => {
                console.log(a)
                this.showToastMsg(a, ToastTypes.DANGER);
                // this._toastService.error(a);
              })
            }
          } else {
            (document.getElementById('modalBtn')?.click());
          }
        }, (err: any) => {
          console.log(`---------------------Google check user error-`);
          console.log(err);
        });
      }, function (error: any) {
        console.log(JSON.stringify(error, undefined, 2));
      });
  }

  async getCountries() {
    this.signupService.getCountriesData().subscribe(
      data => {
        this.countriesData = data?.data;
        console.log(this.countriesData);
      }
    )
  }

  onSaveData() {
    try {
      if (this.extra.loading) {
        return;
      }
      this.mobileMsg = '';
      const obj = {
        ...this.userData,
        agree_terms: true,
        agree_marketing: true
      };
      if (
        obj?.mobile_number?.length < 10 ||
        obj?.mobile_number?.length > 13
      ) {
        // this.mobileMsg = 'Mobile Number must be between 10 to 12 digits';
        alert(`Mobile Number must be between 10 to 12 digits`)
        return;
      }
      this.extra.loading = true;
      this.loginService.loginUserWithGoogle(obj).subscribe(
        (data: any) => {

          if (!data?.success) {
            alert(data?.errors ? data?.errors[0] : (data?.message || "Something went wrong"))
            return;
          }
          console.log(data);
          this.extra.loading =false;
          if (data.status === 200) {
            (document.getElementById('closeModal')?.click())
            if (data.message && data.message?.length > 0) {
              this.showToastMsg(data.message, ToastTypes.SUCCESS);
            }
            const userId = (data.data && data.data[0]) ? data?.data[0]?.id : data?.data?.id;
            // this._toastService.success(data.message);
            localStorage.setItem("token", data.access_token);
            localStorage.setItem("currentUser", JSON.stringify(data));

            if (data.data[0].profile_type === "Player") {
              console.log('Player Logged in')
              this.showToastMsg('Player Logged in', ToastTypes.SUCCESS);
              // this._toastService.success('Player Logged in');
              this.router.navigate([`/edit-player/${userId}`]);
            } else if (data.data[0].profile_type === "Coach") {
              console.log('Coach Logged in')
              this.showToastMsg('Coach Logged in', ToastTypes.SUCCESS);
              // this._toastService.success('Coach Logged in');
              this.router.navigate([`/edit-coach/${userId}`]);
            } else if (data.data[0].profile_type === "Club") {
              console.log('Club Loggin in')
              this.showToastMsg('Club Logged in', ToastTypes.SUCCESS);
              // this._toastService.success('Club Logged in');
              this.router.navigate([`/club-details/${userId}`]);
            } else {
              if (data?.errors) {
                data.errors.map((a: string) => {
                  console.log(a)
                  this.showToastMsg(a, ToastTypes.DANGER);
                  // this._toastService.error(a);
                })
              } else {
                this.showToastMsg('Player Logged in', ToastTypes.SUCCESS);
                // this._toastService.success('Player Logged in');
                this.router.navigate([`/edit-player/${userId}`]);
              }
            }
          }
        }, err => {
          console.log(`-------------------Err-`);
          console.log(err);
        });
    } catch (e: any) {
      this.showToastMsg(e?.message || e, ToastTypes.DANGER);
    } finally {
      this.extra.loading = false;
    }
  }

  showToastMsg(msg: any, type: any) {
    if (type === ToastTypes.SUCCESS) {
      this._toastService.success(msg);
    } else {
      this._toastService.error(msg);
    }
  }

  ngAfterViewInit() {
    this.googleInit();
  }

  openCenteredModal(content: any, type: any) {
    console.log(type);
    this.modalService.open(content, {centered: true});
  }

  async getRoles() {
    this.signupService.getRolesData().subscribe(
      data => {
        let rolesDataRaw = data.data
        this.rolesData = rolesDataRaw.slice().reverse();
        console.log(this.rolesData);
      }
    )
  }


  selectCountry(country: any) {
    this.userData['country_id'] = country;
  }

  onChangeCountryCode(code: any) {
    this.userData['country_code'] = code;
  }


}
