import {Component, TemplateRef, ViewChild} from '@angular/core';
import {HeaderComponent} from '../header/header.component';
import {FooterComponent} from '../footer/footer.component';
import {BannerComponent} from '../../commercial-website/banner/banner.component';
import {AbstractControl, FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {LoginService} from './login.service';
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';
// import { AngularToastifyModule, ToastService } from 'angular-toastify';
import {NgOtpInputModule} from 'ng-otp-input';
import {GoogleSignInComponent} from "../google-login/google-sign-in.component";
import {NgbToast} from "@ng-bootstrap/ng-bootstrap";
import {ManualToastService} from "../../../shared/ManualToastService";

// import { ToastService, SimpleToast, ToastPosition, ToastTypes} from "ngx-action-toastr";
// import { ToastService, SimpleToast, ToastPosition, ToastTypes} from "ngx-action-toastr";

const ToastTypes: any = {
  SUCCESS: 'bg-success text-light',
  DANGER: 'bg-danger text-light'
};

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, BannerComponent, ReactiveFormsModule, CommonModule,
    // AngularToastifyModule,
    NgOtpInputModule, GoogleSignInComponent, NgbToast
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;
  loginForm: any;
  hidePassword = true;
  loginFormSubmitted: boolean = false;
  otpModal: boolean = false;
  OTPFormIntro: boolean = true;
  otpForm: any;
  otpFormSubmitted: boolean = false

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    protected toastService: ManualToastService
    // private _toastService: ToastService
  ) {
  }

  ngOnInit() {
    this.createForm();
  }

  get getControl(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(24), this.passwordValidator]],
    });

    this.otpForm = this.fb.group({
      otp: ['', [Validators.required]],
    })
  }

  async resendOTP() {
    // console.log(this.registerForm.value)
    let email = this.loginForm.get('email').value
    this.loginService.resendEmailOTP({email}).subscribe(
      data => {
        console.log(data)
        if (data.status === 200) {
          this.showToastMsg(data.message, ToastTypes.SUCCESS);
          // this._toastService.success(data.message);
        } else {
          this.showToastMsg(data.message, ToastTypes.DANGER);
          // this._toastService.error(data.message);
        }

      }
    )
  }

  handleOTPValue(a: any) {
    this.otpForm.get('otp').setValue(a)
  }

  toggleOTPModal(): void {
    this.otpModal = !this.otpModal;
  }

  handleOTPForm() {
    this.OTPFormIntro = !this.OTPFormIntro
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

  async login() {
    this.loginFormSubmitted = true

    console.log(this.loginForm.valid)
    console.log(this.loginFormSubmitted)

    if (this.loginForm.valid) {
      this.loginService.validateAllFormFields(this.loginForm)
      // console.log(this.loginForm.value)
      this.loginService.loginUser(this.loginForm.value).subscribe(
        (data: any) => {
          this.onVerifyUserData(data);
        }
      )
    } else {
      console.log("Error")
      this.showToastMsg('Invalid email or password', ToastTypes.DANGER);
      // this._toastService.error('Invalid email or password.');
    }
  }

  async verifyEmail() {
    this.otpFormSubmitted = true
    // console.log(this.registerForm.value)
    // console.log(this.otpForm.value)
    if (this.otpForm.valid) {
      console.log(this.otpForm.value)
      let email = this.loginForm.get('email').value
      let otp = this.otpForm.get('otp').value
      this.loginService.verifyEmail({email, otp}).subscribe(
        data => {
          console.log(data)
          if (data.status === 200) {
            this.showToastMsg(data.message, ToastTypes.SUCCESS);
            // this._toastService.success(data.message);
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 1000);
          } else {
            this.showToastMsg(data.message, ToastTypes.DANGER);
            // this._toastService.error(data.message);
          }
        }
      )
    } else {
      console.log("Error")
      this.showToastMsg('Error', ToastTypes.DANGER);
      // this._toastService.error('Error');
    }
    this.otpFormSubmitted = false
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  isTemplate(toast: any) {
    return toast.textOrTpl instanceof TemplateRef;
  }

  showToastMsg(msg: any, type: any = ToastTypes.SUCCESS) {
    this.toastService.show(msg, {classname: type, delay: 3000});
    /*const options = new SimpleToast(
      ToastPosition.RIGHT_TOP,
      msg,
      type,
    );
    options.timeToDisplay = 2000;
    this._toastService.createSimpleToast(options);*/
  }

  validateUserInput(data: any) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
      return 'A valid email address is required.';
    }
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#.,\-\[\]?/'\\!]).{8,}$/;
    if (!data.password || !passwordRegex.test(data.password)) {
      return `Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character (&#64;, #, -, [, ], ?, /, ', \\, !)`;
    }
    return true;
  }

  onVerifyUserData(data: any) {
    console.log(data);
    if (data.status !== 200) {
      data.errors.map((a: string) => {
        this.showToastMsg(a, ToastTypes.DANGER);
        //	this._toastService.error(a);
      });
      if (data.errors[0] === "Your email not verified.") {
        this.OTPFormIntro = true;
        this.otpModal = true;
        this.resendOTP()
      }
    } else if (data.status === 200) {
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
    }
  }

}



