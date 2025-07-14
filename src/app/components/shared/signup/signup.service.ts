import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class SignupService {
    apiUrl = "https://admin-dev.limbersport.net";
    getRolesUrl = `${this.apiUrl}/api/v1/roles-list`;
    getCountriesUrl = `${this.apiUrl}/api/v1/country-list`;
    registerUrl = `${this.apiUrl}/api/auth/registration`;
    emailOTPUrl = `${this.apiUrl}/api/auth/resend-email-otp`;
    verifyUrl = `${this.apiUrl}/api/auth/verify-email`;
    socialLoginUrl=`${this.apiUrl}/social-login/google`

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

    getRolesData(): Observable<any> {
        return this.http.get<any>(this.getRolesUrl);
    }

    getCountriesData(): Observable<any> {
        return this.http.get<any>(this.getCountriesUrl);
    }

    registerUser(data: any): Observable<any> {
        console.log(data)
        return this.http.post<any>(this.registerUrl, data);
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
