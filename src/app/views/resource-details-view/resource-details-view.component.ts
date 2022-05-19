import { RequestSavedItem } from "./../../models/request/requestSavedItem";
import { SavedItem } from "./../../models/savedItem";
import { SavedItemService } from "./../../services/saved-item.service";
import { AuthService } from "./../../services/auth.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { JikanService } from "../../services/jikan.service";
import { ItemDetails } from "../../models/item-details";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpErrorResponse } from "@angular/common/http";

enum ErrorResponseMessages {
  SER01 = "Validation error",
  SER02 = "Entry not found error",
  SER03 = "Incorrect username or password",
  SER04 = "Entry already exists",
  SYS01 = "Unexpected error",
  SYS02 = "Unexpected error",
}
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
  savedItem: SavedItem;
  isSavedItemLoading = true;
  assignedRating: string;

  urlData = {
    resourceType: "",
    resourceId: "",
  };

  constructor(
    private jikamService: JikanService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private savedItemService: SavedItemService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    //Get resource name and id from url
    this.urlData.resourceType = <string>(
      this.route.snapshot.paramMap.get("type")
    );
    this.urlData.resourceId = <string>this.route.snapshot.paramMap.get("id");
    //Get current resource data from the API
    this.getResourceDetailsByNameAndId(
      this.urlData.resourceType,
      this.urlData.resourceId
    );
    //Get Session
    const userSession = this.authService.getUserSessionSync();
    if (userSession) {
      this.isSessionActive = true;
      this.findExistInUserSavedItems();
    }
  }

  findExistInUserSavedItems() {
    //Set default values to variables
    this.isSaved = false;
    this.isSavedItemLoading = true;
    this.savedItemService
      .findJikanItemExistenceInSavedItems(Number(this.urlData.resourceId))
      .subscribe({
        next: (response: SavedItem) => {
          this.isSaved = true;
          this.savedItem = response;
          this.assignedRating = this.savedItem.user_rating.toString();
        },
        error: () => {
          this.isSaved = false;
          this.isSavedItemLoading = false;
          this.assignedRating = "notRated";
        },
        complete: () => {
          this.isSavedItemLoading = false;
        },
      });
  }

  createSavedItem() {
    const newSavedItem = {
      third_party_item_id: Number(this.urlData.resourceId),
      user_rating: Number(this.assignedRating),
      type: {
        name: this.urlData.resourceType,
      },
    } as RequestSavedItem;
    this.savedItemService.createSavedItem(newSavedItem).subscribe({
      next: () => {
        this.snackBar.open("Rating saved successfully", "Dismiss", {
          duration: 3000,
        });
      },
      error: (e: HttpErrorResponse) => {
        const errorCode = e.error.code as string;
        this.showError(errorCode);
      },
      complete: () => {
        //Update UI with new call
        this.findExistInUserSavedItems();
      },
    });
  }

  deleteSavedItem() {
    this.savedItemService.deleteSavedItem(this.savedItem.id).subscribe({
      next: () => {
        this.snackBar.open("Rating deleted successfully", "Dismiss", {
          duration: 3000,
        });
      },
      error: (e: HttpErrorResponse) => {
        const errorCode = e.error.code as string;
        this.showError(errorCode);
      },
      complete: () => {
        //Update UI with new call
        this.findExistInUserSavedItems();
      },
    });
  }

  updateSavedItem() {
    const newSavedItem = {
      rating: Number(this.assignedRating),
    } as RequestSavedItem;
    this.savedItemService
      .updateSavedItem(this.savedItem.id, newSavedItem)
      .subscribe({
        next: () => {
          this.snackBar.open("Rating updated successfully", "Dismiss", {
            duration: 3000,
          });
        },
        error: (e: HttpErrorResponse) => {
          const errorCode = e.error.code as string;
          this.showError(errorCode);
        },
        complete: () => {
          //Update UI with new call
          this.findExistInUserSavedItems();
        },
      });
  }

  private showError(errorCode: string) {
    this.snackBar.open(
      ErrorResponseMessages[errorCode as keyof typeof ErrorResponseMessages],
      "Dismiss",
      {
        duration: 3000,
      }
    );
  }

  getResourceDetailsByNameAndId(type: string, id: string) {
    this.isLoading = true;
    this.jikamService.getResourceDetailsByTypeAndId(type, id).subscribe({
      next: (response: any) => {
        this.details = response.data;
      },
      error: (e) => {
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
