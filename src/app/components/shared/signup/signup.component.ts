import {AfterViewInit, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
// import {ToastrModule, ToastrService} from 'ngx-toastr';
// import { ToastService, SimpleToast, ToastTypes, ToastPosition } from 'ngx-action-toastr';

import {HeaderComponent} from '../header/header.component';
import {FooterComponent} from '../footer/footer.component';
import {BannerComponent} from '../../commercial-website/banner/banner.component';
import {AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {SignupService} from './signup.service';
import {Router} from '@angular/router';
 import {AngularToastifyModule} from 'angular-toastify';
import {CommonModule} from '@angular/common';
import {NgOtpInputModule} from 'ng-otp-input';
import {NgSelectComponent, NgSelectModule} from '@ng-select/ng-select';
import {SelectDropDownModule} from 'ngx-select-dropdown';
import {ManualToastService} from "../../../shared/ManualToastService";
import {NgbToast} from "@ng-bootstrap/ng-bootstrap";
/*import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,GoogleSigninButtonModule,
} from '@abacritt/angularx-social-login';*/
import {GoogleSignInComponent} from "../google-login/google-sign-in.component";
import {LoginService} from "../login/login.service";
/*import {BrowserAnimationsModule, provideAnimations} from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import {bootstrapApplication, BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "../../../app.component";

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(), // required animations providers
    provideToastr({
      positionClass :'toast-bottom-right'
    }), // Toastr providers
  ]
});*/

const ToastTypes: any = {
  SUCCESS: 'bg-success text-light',
  DANGER: 'bg-danger text-light'
};

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    HeaderComponent, FooterComponent, BannerComponent, ReactiveFormsModule, CommonModule,
    NgOtpInputModule, AngularToastifyModule, NgSelectModule, SelectDropDownModule, FormsModule, NgbToast, GoogleSignInComponent,
    // GoogleSigninButtonModule, GoogleSignInComponent,
    // This should be imported here
    // @ts-ignore
    //  ToastrModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})

export class SignupComponent implements OnInit, AfterViewInit {

  @ViewChild(NgSelectComponent) ngSelectComponent: NgSelectComponent;
  registerForm: any;
  otpForm: any;
  registerFormSubmitted: boolean = false;
  otpFormSubmitted: boolean = false;
  otpModal: boolean = false;
  OTPFormIntro: boolean = true;
  isFormLoaded = false;
  hidePassword = true;
  hideConfirmPassword = true;
  rolesData: any;
  countriesData: any;
  extra: any = {};
  // socialUser!: SocialUser;

  constructor(
    private fb: FormBuilder,
    // private socialAuthService: SocialAuthService,
    private router: Router,
    private signupService: SignupService,
    protected _toastService: ManualToastService,
    // private loginService: LoginService
    // private toastr: ToastrService
  ) {
  }

  ngAfterViewInit() {
  }

  selectedCountry: any = null;

  selectCountry(country: any) {
    this.selectedCountry = country;
    this.registerForm.get('country_id')?.setValue(country?.id);
    this.onCountrySelect(country?.id);
    // setTimeout(() => this.setCursorToEnd(), 500);
  }

  config = {
    displayFn: (item: any) => {
      return item.name + " (+" + item.isd_code + ")"
    },
    displayKey: "code",
    search: true,
    height: '400px',
    placeholder: 'Select Code',
    limitTo: 0,
    moreText: 'more',
    noResultsFound: 'No results found!',
    searchPlaceholder: 'Search',
    searchOnKey: 'name',
  };

  ngOnInit() {
    this.createForm();
    this.getRoles();
    this.getCountries();
  /*  this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      console.log(this.socialUser);
      console.log(this.socialUser?.idToken);
      let inputObj = {
        'provider': 'google',
        'access_token': this.socialUser?.idToken
      }
      console.log(inputObj?.access_token);
      this.loginService.loginUserWithGoogle(inputObj).subscribe(
        (data: any) => {
          console.log(data);
        }, err => {
          console.log(`-------------------Err-`);
          console.log(err);
        });
    });*/
  }

  get getControl(): { [key: string]: AbstractControl } {
    const controls = this.registerForm.controls;

    if (
      controls['password'] &&
      controls['confirm_password'] &&
      controls['password'].touched &&
      controls['confirm_password'].touched
    ) {
      const password = controls['password'].value;
      const confirm_password = controls['confirm_password'].value;

      if (password !== confirm_password) {
        controls['confirm_password'].setErrors({passwordMismatch: true});
      } else {
        controls['confirm_password'].setErrors(null);
      }
    }
    return controls;
  }

  onCountrySelect(id = null) {
    const countryId = this.registerForm.get('country_id').value;
    console.log(countryId);
    const foundCountry = this.countriesData.find((country: any) => (country.id === countryId));
    this.registerForm.get('country_code').setValue(foundCountry.dial_code)
  }

  searchChange(event: any) {
    console.log(event.value.isd_code)
    this.registerForm.get('country_code').setValue(event.value.isd_code)
  }

  createForm() {
    this.registerForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.maxLength(24), Validators.minLength(3)]],
      last_name: ['', [Validators.required, Validators.maxLength(24), Validators.minLength(3)]],
      country_code: [null, [Validators.required]],
      mobile_number: ['', [Validators.required, Validators.pattern(/^\d{10,12}$/)]],
      role_id: ['', [Validators.required]],
      country_id: [null, [Validators.required]],
      agree_terms: ['', [Validators.required]],
      agree_marketing: [''],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(24), this.passwordValidator]],
      confirm_password: ['', [Validators.required]],
    });

    this.otpForm = this.fb.group({
      otp: ['', [Validators.required]],
    })

    this.isFormLoaded = true;
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

  async getCountries() {
    this.signupService.getCountriesData().subscribe(
      data => {
        this.countriesData = data?.data;
        console.log(this.countriesData);
      }
    )
  }

  handleOTPValue(a: any) {
    this.otpForm.get('otp').setValue(a)
  }

  passwordValidator(control: any) {
    const value = control.value;
    if (!value) return null;

    const hasNumber = /\d/.test(value);
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    // const hasSpecial = /[@#,\-\[\]?/'\\]/.test(value);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>[\]\\/;'`~_\-+=]/.test(value);

    if (hasNumber && hasUpperCase && hasLowerCase && hasSpecial) {
      return null;
    } else {
      return {passwordInvalid: true};
    }
  }

  async register() {
    if (this.registerFormSubmitted) {
      return;
    }
    const isValid = this.validateUserInput(this.registerForm.value);
    if (isValid !== true) {
      this.showToastMsg(isValid, ToastTypes.DANGER);
      return;
    }

    if (this.registerForm.valid) {

      this.signupService.validateAllFormFields(this.registerForm);
      this.registerFormSubmitted = true;
      this.signupService.registerUser(this.registerForm.value).subscribe(
        (data: any) => {
          this.registerFormSubmitted = false;
          if (data.status === 200) {
            this.showToastMsg(data.message, ToastTypes.SUCCESS);
            this.OTPFormIntro = true;
            this.otpModal = true;
          } else if (data.errors && Array.isArray(data.errors)) {
            data.errors.forEach((error: string) => {
              // this._toastService.error(error);
              this.showToastMsg(error, ToastTypes.DANGER);
            });
          } else if (data.message) {
            // this._toastService.error(data.message);
            this.showToastMsg(data?.message, ToastTypes.DANGER);
          } else {
            // this._toastService.error("An unknown error occurred. Please try again later.");
            this.showToastMsg("An unknown error occurred. Please try again later.", ToastTypes.DANGER);
          }
        },
        (error) => {
          this.registerFormSubmitted = false;
          // Handle unexpected errors like network issues
          this.showToastMsg("An error occurred: " + (error?.message || "Please try again later."), ToastTypes.DANGER);
          // this._toastService.error("An error occurred: " + (error?.message || "Please try again later."));
        }
      );
    } else {
      this.showToastMsg("Please correct the errors in the form before submitting.", ToastTypes.DANGER);
      // this._toastService.error("Please correct the errors in the form before submitting.");
    }
  }


  /* async register() {
     this.registerFormSubmitted = true
     // console.log(this.registerForm)
     // console.log(this.registerFormSubmitted)

     if (this.registerForm.valid) {
       this.signupService.validateAllFormFields(this.registerForm)
       // console.log(this.registerForm.value)
       this.signupService.registerUser(this.registerForm.value).subscribe(
         (data: any) => {
           // console.log(data)
           if (data.status === 200) {
             this._toastService.success(data.message);
             this.OTPFormIntro = true
             this.otpModal = true
           } else {
             data.errors.map((a: string) => {
               console.log(a)
               // this._toastService.error(a);
             })
           }
         }
       )
     } else {
       // this._toastService.error("Error");
     }
     this.registerFormSubmitted = false
   }*/

  toggleOTPModal(): void {
    this.otpModal = !this.otpModal;
  }

  handleOTPForm() {
    this.OTPFormIntro = !this.OTPFormIntro
  }

  isTemplate(toast: any) {
    return toast.textOrTpl instanceof TemplateRef;
  }

  togglePasswordVisibility(a: string): void {
    if (a === 'password') {
      this.hidePassword = !this.hidePassword;
    } else if (a === 'confirm_password') {
      this.hideConfirmPassword = !this.hideConfirmPassword;
    }
  }

  async resendOTP() {
    // console.log(this.registerForm.value)
    let email = this.registerForm.get('email').value
    this.signupService.resendEmailOTP({email}).subscribe(
      data => {
        console.log(data)
        if (data.status === 200) {
          // this._toastService.success(data.message);
          this.showToastMsg(data.message, ToastTypes.SUCCESS)
        } else {
          // this._toastService.error(data.message);
          this.showToastMsg(data?.message, ToastTypes.DANGER);
        }

      }
    )
  }

  async verifyEmail() {
    this.otpFormSubmitted = true
    // console.log(this.registerForm.value)
    // console.log(this.otpForm.value)
    if (this.otpForm.valid) {
      console.log(this.otpForm.value)
      let email = this.registerForm.get('email').value
      let otp = this.otpForm.get('otp').value
      this.signupService.verifyEmail({email, otp}).subscribe(
        data => {
          console.log(data)
          if (data.status === 200) {
            this.showToastMsg(data.message, ToastTypes.SUCCESS);

            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 1000);
          } else {
            // this._toastService.error(data.message);
            this.showToastMsg(data?.message, ToastTypes.DANGER);
          }
        }
      )
    } else {
      console.log("Error")
      // this._toastService.error('Error');
      this.showToastMsg("Error", ToastTypes.DANGER);
    }
    this.otpFormSubmitted = false
  }

  onChangeCountryCode(ev: any) {
    let val = ev?.target ? ev?.target?.value : ev;
    console.log(val);
    const foundCountry = this.countriesData.find((country: any) => (country.dial_code === val));
    console.log(foundCountry);
    if (foundCountry) {
      this.selectedCountry = foundCountry;
      this.registerForm.get('country_id').setValue(foundCountry.id)
    }
  }

  validateUserInput(data: any) {
    if (!data.first_name || typeof data.first_name !== 'string' || data.first_name.trim() === '') {
      return 'First name is required and must be a valid.';
    }
    if (!data.last_name || typeof data.last_name !== 'string' || data.last_name.trim() === '') {
      return 'Last name is required and must be a valid.';
    }
    if (!data.country_code || isNaN(data.country_code) || data.country_code.trim() === '') {
      return 'Country code is required and must be a valid.';
    }
    if (!data.mobile_number || isNaN(data.mobile_number) || data.mobile_number.toString().length < 8) {
      return 'Mobile number is required and must be a valid number with at least 12 digits.';
    }
    if (!data.role_id || isNaN(data.role_id)) {
      return 'Role is required.';
    }
    if (!data.country_id || data.country_id.trim() === '') {
      return 'Country is required.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
      return 'A valid email address is required.';
    }
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#.,\-\[\]?/'\\!]).{8,}$/;
    if (!data.password || !passwordRegex.test(data.password)) {
      return `Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character (&#64;, #, -, [, ], ?, /, ', \\, !)`;
    }
    if (data.password !== data.confirm_password) {
      return 'Confirm password must match the password.';
    }
    if (!data.agree_terms) {
      return 'You must agree to the terms and conditions.';
    }
    return true;
  }

  showToastMsg(msg: any, type: any = ToastTypes.SUCCESS) {
    this._toastService.show(msg, { classname: type, delay: 3000 });
  }

  setCursorToEnd() {
    const inputElement = this.ngSelectComponent.searchInput.nativeElement;
    if (inputElement) {
      const valueLength = inputElement.value.length;
      inputElement.setSelectionRange(valueLength, valueLength);
      inputElement.focus();
    }
  }

}



