import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Member } from '../_models/member';
import { map, of } from 'rxjs';
import { PaginatedResult } from '../_models/pagination';
import { UserParams } from '../_models/userParams';


@Injectable({
  providedIn: 'root'
})
export class MembersService {

  baseUrl = environment.apiUrl;
  members: Member[] = [];
  membercache = new Map();
  
  constructor(private http: HttpClient) { }

  getMembers(userParams: UserParams) {
    // console.log(Object.values(userParams).join('-'));

    var response = this.membercache.get(Object.values(userParams).join('-'));
    if(response) {
      return of(response);
    }

    let params = this.getPaginationHeaders(userParams.pageNumber, userParams.pageSize);

    params = params.append('minAge', userParams.minAge.toString());
    params = params.append('maxAge', userParams.maxAge.toString());
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy', userParams.orderBy);

    // Caches the already searched for output
    return this.getPaginatedResult<Member[]>(this.baseUrl + 'users', params)
    .pipe(map(response => {
      this.membercache.set(Object.values(userParams).join('-'), response);
      return response;
    }));
  }

  private getPaginationHeaders(pageNumber: number, pageSize: number) {
    let params = new HttpParams();

    // Update QueryString
    if(pageNumber !== null && pageSize !== null) {
      params = params.append('pageNumber', pageNumber.toString());
      params = params.append('pageSize', pageSize.toString());
    }

    return params;
  }

  getMember(username) {
    const member = [...this.membercache.values()]
                    .reduce((arr, elem) => arr.concat(elem.result), [])
                    .find((member: Member) => member.username === username);
    
    if(member) {
      return of(member);
    }

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

  private getPaginatedResult<T>(url, params) {
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();

    return this.http.get<T>(url, { observe: 'response', params }).pipe(
      map(response => {
        paginatedResult.result = response.body;

        if (response.headers.get('Pagination') !== null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }

        return paginatedResult;
      })
    );
  }
  
}
