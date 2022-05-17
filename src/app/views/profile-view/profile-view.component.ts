import { ProfileSavedItem } from './../../models/profileSavedItem';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Categories } from "src/constants";
/*
const dummyAnimes: SavedItem[] = [
  {
    url: "/resource/anime/21",
    title: "One Piece",
    rating: 9.8,
    status: "Airing",
    year: 1999,
  },
  {
    url: "/resource/anime/44042",
    title: "Holo no Graffiti",
    rating: 8.0,
    status: "Finished",
    year: 2020,
  },
];

const dummyMangas: SavedItem[] = [
  {
    url: "/resource/manga/2",
    title: "Berserk",
    rating: 9.8,
    status: "Finished",
    year: 1999,
  },
  {
    url: "/resource/manga/656",
    title: "Vagabond",
    rating: 8.0,
    status: "Finished",
    year: 2020,
  },
];*/

@Component({
  selector: "app-profile-view",
  templateUrl: "./profile-view.component.html",
  styleUrls: ["./profile-view.component.sass"],
})
export class ProfileViewComponent implements OnInit {
  username:string;
  savedMangas!: ProfileSavedItem[];
  savedAnimes!: ProfileSavedItem[];

  ngOnInit(): void {
    //Get Session
    const userSession = this.authService.getUserSessionSync();
    this.username = userSession!.jwt.payload.user.name;
    //Get SavedItems of type Manga
    this.apiService.getUserSavedItemsOfType(Categories.MANGA).subscribe({
      next: (response:ProfileSavedItem[]) => {
        console.log(response);
        this.savedMangas = response;
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {
      },
    });
    //Get SavedItems of type Anime
    this.apiService.getUserSavedItemsOfType(Categories.ANIME).subscribe({
      next: (response:ProfileSavedItem[]) => {
        console.log(response);
        this.savedAnimes = response;
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {
      },
    });
  }

  constructor(private authService: AuthService, private apiService:ApiService) {}
}
