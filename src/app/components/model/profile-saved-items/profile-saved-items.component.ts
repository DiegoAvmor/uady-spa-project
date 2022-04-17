import { Component, Input } from "@angular/core";
import { ItemCategory } from "src/app/models/ItemCategory";
import { SavedItem } from "src/app/models/SavedItem";

@Component({
  selector: "app-profile-saved-items",
  templateUrl: "./profile-saved-items.component.html",
  styleUrls: ["./profile-saved-items.component.sass"],
})
export class ProfileSavedItemsComponent {
  @Input() headerTitle!: string;
  @Input() dataSource!: SavedItem[];
  @Input() itemCategory!: ItemCategory;

  displayedColumns = ["itemCategory", "rating", "status", "year"];
}
