import { SavedItemService } from './../../services/saved-item.service';
import { ProfileSavedItem } from './../../models/profileSavedItem';
import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Categories } from "src/constants";

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
    this.savedItemService.getUserSavedItemsOfType(Categories.MANGA).subscribe((response:ProfileSavedItem[]) => {
      console.log(response);
      this.savedMangas = response;
    });
    //Get SavedItems of type Anime
    this.savedItemService.getUserSavedItemsOfType(Categories.ANIME).subscribe((response:ProfileSavedItem[]) => {
      console.log(response);
      this.savedAnimes = response;
    });
  }

  constructor(private authService: AuthService, private savedItemService:SavedItemService) {}
}
