import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Member } from '../_models/member';
import { map, of } from 'rxjs';
import { PaginatedResult } from '../_models/pagination';


@Injectable({
  providedIn: 'root'
})
export class MembersService {

  baseUrl = environment.apiUrl;
  members: Member[] = [];
  paginatedResult: PaginatedResult<Member[]> = new PaginatedResult<Member[]>();
  
  constructor(private http: HttpClient) { }

  getMembers(page?: number, itemsperPage?: number) {
    //if(this.members.length > 0) return of(this.members);

    let params = new HttpParams();

    // Update QueryString
    if(page !== null && itemsperPage !== null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsperPage.toString());
    }

    return this.http.get<Member[]>(this.baseUrl + 'users', {observe: 'response', params}).pipe(
      // map(members => {
      //   this.members = members;
      //   return members;
      // })

      map(response => {
        this.paginatedResult.result = response.body;
        
        if(response.headers.get('Pagination') !== null) {
          this.paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }

        return this.paginatedResult;
      })
    );  
  }

  getMember(username) {
    const member = this.members.find( x=> x.username === username);
    if(member !== undefined) return of(member);

    return this.http.get<Member>(this.baseUrl + 'users/' + username);  // Type Safety**
  }

  updateMember(member: Member) {
    return this.http.put(this.baseUrl + 'users', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = member;
      })
    );
  }

  setMainPhoto(photoId: number) {
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {});
  }

  deletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId, {});
  }
  
}
