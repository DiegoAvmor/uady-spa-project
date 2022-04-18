import { Component } from "@angular/core";
import { ItemCategory } from "src/app/models/utils/ItemCategory";
import { SavedItem } from "src/app/models/SavedItem";

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
];

@Component({
  selector: "app-profile-view",
  templateUrl: "./profile-view.component.html",
  styleUrls: ["./profile-view.component.sass"],
})
export class ProfileViewComponent {
  savedMangas!: SavedItem[];
  savedAnimes!: SavedItem[];
  itemCategory = ItemCategory;

  constructor() {
    this.savedAnimes = dummyAnimes;
    this.savedMangas = dummyMangas;
  }
}
