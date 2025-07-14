import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRoles } from './login.model';
import { catchError } from 'rxjs/operators';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root',
})
export class LoginService {
    apiUrl = "https://admin-dev.limbersport.net";
    loginUrl = `${this.apiUrl}/api/auth/login`;
    googleLoginUrl = `${this.apiUrl}/api/auth/social-signin`;
    emailOTPUrl = `${this.apiUrl}/api/auth/resend-email-otp`;
    verifyUrl = `${this.apiUrl}/api/auth/verify-email`;

    constructor(private http: HttpClient) { }

    validateAllFormFields(formGroup: any) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup || control instanceof FormArray) {
                this.validateAllFormFields(control);
            }
        });
    }

    loginUser(data: any): Observable<any> {
        console.log(data)
        return this.http.post<any>(this.loginUrl, data);
    }

    loginUserWithGoogle(data: any): Observable<any> {
        console.log(data)
        return this.http.post<any>(this.googleLoginUrl, data);
    }

    resendEmailOTP({ email }: any): Observable<any> {
        console.log(email)
        return this.http.post<any>(this.emailOTPUrl, { email });
    }

    verifyEmail({ email, otp }: any): Observable<any> {
        console.log(email, otp)
        return this.http.post<any>(this.verifyUrl, { email, otp });
    }
}
