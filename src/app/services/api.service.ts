import { JikanService } from './jikan.service';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { User } from '../models/user';
import { environment as env } from "src/environments/environment";
import { ItemDetails } from '../models/item-details';
import { SavedItem } from '../models/savedItem';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private API_BASE_URL = `${env.api.auth.url}`;

  constructor(private http: HttpClient, private authService:AuthService, private jikanService:JikanService) {

  }


  getUserSavedItemsOfType(type:string): Observable<any>{
    return this.http
    .get<any>(
      `${this.API_BASE_URL}/items/user/type/${type}`,
      { headers: this.getAuthorizationHeaders()}
    )
    .pipe(
      switchMap( savedItems => {
        const profileSavedItems = savedItems.map(
          (apiItem:SavedItem) => {
            return this.jikanService.getResourceDetailsByTypeAndId(type, apiItem.third_party_item_id.toString())
            .pipe(
              map((jikanItem:ItemDetails) => {
                return {
                  apiItem: apiItem,
                  jikanItem: jikanItem,
                  url: `/resource/${type}/${apiItem.third_party_item_id}`
                }
              })
            )
          }
        );
        return forkJoin(profileSavedItems);
      }),
    );
  }


  getAllUsers(): Observable<User[]>{
    return this.http
    .get<User[]>(
      `${this.API_BASE_URL}/users`,
      { headers: this.getAuthorizationHeaders()}
    );
  }


  deleteUser(userId:number): Observable<User>{
    return this.http
    .delete<User>(
      `${this.API_BASE_URL}/users/${userId}`,
      { headers: this.getAuthorizationHeaders()}
    );
  }

  getAuthorizationHeaders(){
    const token = this.authService.getUserSessionSync()?.jwt.token;
    let requestHeaders = new HttpHeaders();
    return requestHeaders.set('Authorization', `Bearer ${token!}`);
  }

}
