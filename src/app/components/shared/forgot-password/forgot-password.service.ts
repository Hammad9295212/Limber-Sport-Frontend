import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class ForgotPasswordService {
    apiUrl = "https://admin-dev.limbersport.net";
    forgetPasswordURL = `${this.apiUrl}/api/auth/forget-password`;
    resetPasswordURL = `${this.apiUrl}/api/auth/reset-password`;

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

    sendEmailOTP(data: any): Observable<any> {
        console.log(data)
        return this.http.post<any>(this.forgetPasswordURL, data);
    }


    changePassword(data: any): Observable<any> {
        console.log(data)
        return this.http.post<any>(this.resetPasswordURL, data);
    }

}
