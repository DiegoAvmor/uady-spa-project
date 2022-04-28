import { environment } from "../../environments/environment";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { Anime } from "../models/anime";
import { Manga } from "../models/manga";
import { ItemDetails } from "../models/item-details";
import { Paginated } from "../models/paginated";

const max_searched_items = 15;

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getResourceDetailsByTypeAndId(
    type: string,
    id: string
  ): Observable<ItemDetails> {
    return this.http.get<any>(this.apiUrl + `/${type}/${id}`).pipe(
      //map((response:Data) => new ResourceDetails(response.data)),
      tap((_) => console.log(`Got data from resource ${type} with id ${id}`))
    );
  }

  getTopAnime(): Observable<Anime[]> {
    return this.http
      .get<any>(this.apiUrl + `/top/anime`)
      .pipe(tap((_) => console.log(`Got data from top anime`)));
  }

  getTopManga(): Observable<Manga[]> {
    return this.http
      .get<any>(this.apiUrl + `/top/manga`)
      .pipe(tap((_) => console.log(`Got data from top manga`)));
  }

  getThisSeason(): Observable<Anime[]> {
    return this.http
      .get<any>(this.apiUrl + `/seasons/now`)
      .pipe(tap((_) => console.log(`Got data from this anime season`)));
  }

  searchAnime(query: string, page: number): Observable<Paginated<Anime>> {
    return this.http
      .get<Paginated<Anime>>(
        `${this.apiUrl}/anime?q=${query}&page=${page}&limit=${max_searched_items}`
      )
      .pipe(tap((anime) => console.log(`Search anime`, anime)));
  }

  searchManga(query: string, page: number): Observable<Paginated<Manga>> {
    return this.http
      .get<Paginated<Manga>>(
        `${this.apiUrl}/manga?q=${query}&page=${page}&limit=${max_searched_items}`
      )
      .pipe(tap((manga) => console.log(`Search manga`, manga)));
  }
}
