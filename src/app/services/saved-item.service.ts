import { Injectable } from '@angular/core';
import { Observable, switchMap, map, forkJoin } from 'rxjs';
import { ItemDetails } from '../models/item-details';
import { SavedItem } from '../models/savedItem';
import { environment as env } from "src/environments/environment";
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { JikanService } from './jikan.service';

@Injectable({
  providedIn: 'root'
})
export class SavedItemService {
  private API_BASE_URL = `${env.api.auth.url}`;

  constructor(private http: HttpClient, private authService:AuthService, private jikanService:JikanService) {

  }


  getUserSavedItemsOfType(type:string): Observable<any>{
    return this.http
    .get<any>(
      `${this.API_BASE_URL}/items/user/type/${type}`,
      { headers: this.authService.getAuthorizationHeaders()}
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
}
