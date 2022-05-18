import { RequestSavedItem } from "./../models/request/requestSavedItem";
import { SavedItem } from "./../models/savedItem";
import { Injectable } from "@angular/core";
import { Observable, switchMap, map, forkJoin, tap } from "rxjs";
import { ItemDetails } from "../models/item-details";
import { environment as env } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { JikanService } from "./jikan.service";
import { ProfileSavedItem } from "../models/profileSavedItem";

@Injectable({
  providedIn: "root",
})
export class SavedItemService {
  private API_BASE_URL = `${env.api.auth.url}`;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private jikanService: JikanService
  ) {}

  getUserSavedItemsOfType(type: string): Observable<ProfileSavedItem[]> {
    return this.http
      .get<SavedItem[]>(`${this.API_BASE_URL}/items/user/type/${type}`, {
        headers: this.authService.getAuthorizationHeaders(),
      })
      .pipe(
        switchMap((savedItems) => {
          const profileSavedItems = savedItems.map((apiItem: SavedItem) => {
            return this.jikanService
              .getResourceDetailsByTypeAndId(
                type,
                apiItem.third_party_item_id.toString()
              )
              .pipe(
                map((jikanItem: ItemDetails) => {
                  return {
                    apiItem: apiItem,
                    jikanItem: jikanItem,
                    url: `/resource/${type}/${apiItem.third_party_item_id}`,
                  };
                })
              );
          });
          return forkJoin(profileSavedItems);
        })
      );
  }

  findJikanItemExistanceInSavedItems(jikanId: number): Observable<SavedItem> {
    return this.http.get<SavedItem>(`${this.API_BASE_URL}/items/${jikanId}`, {
      headers: this.authService.getAuthorizationHeaders(),
    });
  }

  createSavedItem(item: RequestSavedItem): Observable<SavedItem> {
    return this.http.post<SavedItem>(`${this.API_BASE_URL}/items`, item, {
      headers: this.authService.getAuthorizationHeaders(),
    });
  }

  deleteSavedItem(itemId: number): Observable<SavedItem> {
    return this.http.delete<SavedItem>(`${this.API_BASE_URL}/items/${itemId}`, {
      headers: this.authService.getAuthorizationHeaders(),
    });
  }

  updateSavedItem(
    itemId: number,
    updatedSavedItem: RequestSavedItem
  ): Observable<SavedItem> {
    return this.http.put<SavedItem>(
      `${this.API_BASE_URL}/items/${itemId}`,
      updatedSavedItem,
      {
        headers: this.authService.getAuthorizationHeaders(),
      }
    );
  }
}
