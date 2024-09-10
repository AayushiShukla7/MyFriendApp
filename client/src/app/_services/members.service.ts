import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Member } from '../_models/member';

// Pass the Token - Auth
const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user'))?.token
  })
}

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  baseUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) { }

  getMembers() {
    return this.http.get<Member[]>(this.baseUrl + 'users', httpOptions);  // Type Safety**
  }

  getMember(username) {
    return this.http.get<Member>(this.baseUrl + 'users/' + username, httpOptions);  // Type Safety**
  }
}
