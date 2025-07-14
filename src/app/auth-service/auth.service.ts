import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  storeAuthToken(authToken: string) {
    throw new Error('Method not implemented.');
  }
  apiUrl="https://admin-dev.limbersport.net/";

  constructor(private http:HttpClient) {
  }
  proceedlogin(usercred:any) : Observable<any> {
    return this.http.post(this.apiUrl,usercred)

  }
  Isloggedin() {
    return localStorage.getItem('token')!=null;
  }
}
