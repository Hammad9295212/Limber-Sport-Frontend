import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { BannerComponent } from '../../commercial-website/banner/banner.component';
import {AbstractControl, FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ForgotPasswordService } from './forgot-password.service';
import { NgOtpInputModule } from 'ng-otp-input';
import { AngularToastifyModule, ToastService } from 'angular-toastify';
import {interval, Subscription} from "rxjs";
import {NgbToast} from "@ng-bootstrap/ng-bootstrap";
import {ManualToastService} from "../../../shared/ManualToastService";

const ToastTypes: any = {
  SUCCESS: 'bg-success text-light',
  DANGER: 'bg-danger text-light'
};

@Component({
	selector: 'app-forgot-password',
	standalone: true,
    imports: [HeaderComponent, FooterComponent, BannerComponent, ReactiveFormsModule, CommonModule, NgOtpInputModule, AngularToastifyModule, NgbToast],
	templateUrl: './forgot-password.component.html',
	styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnDestroy, OnInit {

	paused = false;
	unpauseOnArrow = false;
	pauseOnIndicator = false;
	pauseOnHover = true;
	pauseOnFocus = true;
	emailForm: any;
	changePasswordForm: any;
	hidePassword = true;
	hideCnfmPassword = true;
	emailFormSubmitted: boolean = false;
	changePasswordFormSubmitted: boolean = false;
	isEmailFormView: boolean = true;
	isResetPasswordFormView: boolean = false;

  countdown: number = 600; // 10 minutes in seconds
  isExpired: boolean = false;
  private timerSubscription: Subscription;

	constructor(
		private fb: FormBuilder,
		private router: Router,
		private forgotPasswordService: ForgotPasswordService,
		// private _toastService: ToastService
    protected _toastService: ManualToastService,
  ) {
	}

	ngOnInit() {
		this.createEmailForm();
	}

  startTimer() {
    this.isExpired = false;
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe(); // Cancel any existing timer
    }

    this.timerSubscription = interval(1000).subscribe(() => {
      console.log(this.countdown);
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        this.showToastMsg('OTP were expired, please request a new one', ToastTypes.DANGER);
        this.isEmailFormView = true;
        this.isResetPasswordFormView = false;
        this.isExpired = true;
        this.timerSubscription.unsubscribe(); // Stop the timer
      }
    });
  }

  restartTimer() {
    this.countdown = 600; // Reset to 10 minutes
    this.startTimer();
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

  formatCountdown(seconds: any) {
    const mins = Math.floor(seconds / 60); // Calculate minutes
    const secs = seconds % 60;            // Calculate remaining seconds
    // Format the output as mm:ss
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }


  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

	createEmailForm() {
		this.emailForm = this.fb.group({
			email: [''],
		});
	}

	createChangePasswordForm() {
		this.changePasswordForm = this.fb.group({
			email: [this.emailForm.get('email').value],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(24), this.passwordValidator]],
      confirm_password: [''],
			otp: [''],
		});
	}

	handleOTPValue(a: any) {
		this.changePasswordForm.get('otp').setValue(a)
	}

	async sendEmailOTP() {
		this.emailFormSubmitted = true
		this.emailForm?.get('email')?.setValidators([Validators.required]);

		if (this.emailForm.valid) {
			console.log(this.emailForm.value)
			this.forgotPasswordService.sendEmailOTP(this.emailForm.value).subscribe(
				(data: any) => {
					if (data.status === 200) {
            this.showToastMsg(data.message || 'OTP sent successfully', ToastTypes.SUCCESS);
            console.log('OTP sent successfully')
            this.isExpired = false;
						this.isEmailFormView = false;
            this.restartTimer();
						this.isResetPasswordFormView = true;
						this.createChangePasswordForm()
					} else {
						data.errors.map((a: string) => {
							console.log(a)
              this.showToastMsg(a, ToastTypes.DANGER);
						})
					}
				}
			)
		} else {
      this.showToastMsg("Error", ToastTypes.DANGER);
		}
	}

	async changePassword() {
		this.changePasswordFormSubmitted = true

		this.changePasswordForm?.get('email')?.setValue(this.emailForm.get('email').value);
		this.changePasswordForm?.get('password')?.setValidators([Validators.required]);
		this.changePasswordForm?.get('confirm_password')?.setValidators([Validators.required]);
		this.changePasswordForm?.get('otp')?.setValidators([Validators.required]);

		console.log(this.changePasswordForm.valid)
		console.log(this.changePasswordForm.value)

		if (this.changePasswordForm.valid) {
			console.log(this.changePasswordForm.value)
			this.forgotPasswordService.changePassword(this.changePasswordForm.value).subscribe(
				(data: any) => {
					console.log(data)
					if (data.success === true) {
            this.showToastMsg(data.message || 'Password changed successfully', ToastTypes.SUCCESS);

            console.log('Password changed successfully')
						this.router.navigate([`/login`]);
					} else {
            const msgs = ((Array.isArray(data.errors) && data?.errors?.length) ? data.errors : [data?.message]);
            console.log(msgs);
            msgs.map((a: string) => {
							console.log(a)
              this.showToastMsg(a, ToastTypes.DANGER);
            })
					}
				}
			)
		} else {
      this.showToastMsg("Error", ToastTypes.DANGER);
    }
	}

	togglePasswordVisibility(): void {
		this.hidePassword = !this.hidePassword;
	}
	toggleCnfmPasswordVisibility(): void {
		this.hideCnfmPassword = !this.hideCnfmPassword;
	}

  showToastMsg(msg: any, type: any = ToastTypes.SUCCESS) {
    this._toastService.show(msg, { classname: type, delay: 3000 });
  }

  isTemplate(toast: any) {
    return toast.textOrTpl instanceof TemplateRef;
  }

  get getControl(): { [key: string]: AbstractControl } {
    const controls = this.changePasswordForm.controls;

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


  validateUserInput(data: any) {
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
    if (!data.otp || data?.otp?.length < 6) {
      return 'OTP is required';
    }
    return true;
  }

}



