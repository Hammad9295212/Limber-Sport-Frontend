import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class CoachesService {
    apiUrl = "https://admin-dev.limbersport.net";


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

    getGenderList(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/api/v1/gender-list`);
    }

    getEthnicityList(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/api/v1/ethnicity-list`);
    }

    getSchoolList(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/api/v1/school-list`);
    }

    getUniversityList(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/api/v1/university-list`);
    }

    getCompanyList(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/api/v1/company-list`);
    }

    getPlayData(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/api/v1/play-list`);
    }

    getRolesData(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/api/v1/roles-list`);
    }

    getAbilityData(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/api/v1/ability-list`);
    }

    getCoachList(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/api/v1/coach-list`);
    }

    getCoachDetails(id: any): Observable<any> {
        console.log(id)
        return this.http.get<any>(`${this.apiUrl}/api/v1/get-coach-details?user_id=${id}`);
    }

    updateCoachDetails(data: any): Observable<any> {
        console.log(data)
        return this.http.post<any>(`${this.apiUrl}/api/v1/update-coach-details`, data);
    }

    likeDislikeCoach({ uid, pid }: any): Observable<any> {
        console.log(uid, pid)
        return this.http.get<any>(`${this.apiUrl}/api/v1/like-dislike-coach?user_id=${uid}&coach_id=${pid}`);
    }

}
