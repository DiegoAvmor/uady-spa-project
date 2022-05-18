import { SavedItem } from './../../models/savedItem';
import { SavedItemService } from './../../services/saved-item.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { JikanService } from "../../services/jikan.service";
import { ItemDetails } from "../../models/item-details";

@Component({
  selector: "app-resource-details",
  templateUrl: "./resource-details-view.component.html",
  styleUrls: ["./resource-details-view.component.sass"],
})
export class ResourceDetailsView implements OnInit {
  details!: ItemDetails;
  isLoading = true;
  isRated = true;
  isSessionActive = false;
  isSaved = false;
  savedItem:SavedItem;
  isSavedItemLoading = true;
  constructor(
    private jikamService: JikanService,
    private route: ActivatedRoute,
    private authService:AuthService,
    private savedItemService:SavedItemService,
  ) {}

  ngOnInit(): void {
    //Get resource name and id from url
    const resourceName = <string>this.route.snapshot.paramMap.get("type");
    const resourceId = <string>this.route.snapshot.paramMap.get("id");
    //Get current resource data from the API
    this.getResourceDetailsByNameAndId(resourceName, resourceId);
    //Get Session
    const userSession = this.authService.getUserSessionSync();
    if(userSession){
      this.isSessionActive = true;
      this.savedItemService.findJikanItemExistanceInSavedItems(Number(resourceId))
      .subscribe({
        next: (response:SavedItem) => {
          this.isSaved = true;
          this.savedItem = response;
        },
        error: (e) => {
          this.isSaved = false;
          this.isSavedItemLoading = false;
        },
        complete: () => {
          this.isSavedItemLoading = false;
        },
      });
      //Check if item is already saved by the user
    }
  }

  getResourceDetailsByNameAndId(type: string, id: string) {
    this.isLoading = true;
    this.jikamService.getResourceDetailsByTypeAndId(type, id).subscribe({
      next: (response: any) => {
        this.details = response.data;
        console.log(this.details);
      },
      error: (e) => {
        this.isLoading = false;
        //TODO: Redirect to not found
        console.error(e);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
