import { Component, Input, OnInit } from "@angular/core";
import { ItemCategory } from "src/app/models/ItemCategory";
import { SavedItem } from "src/app/models/SavedItem";

const itemDisplayCategories: Map<ItemCategory, string> = new Map();
itemDisplayCategories.set("anime", "Anime");
itemDisplayCategories.set("manga", "Manga");

@Component({
  selector: "app-profile-saved-items",
  templateUrl: "./profile-saved-items.component.html",
  styleUrls: ["./profile-saved-items.component.sass"],
})
export class ProfileSavedItemsComponent implements OnInit {
  @Input() headerTitle!: string;
  @Input() dataSource!: SavedItem[];
  @Input() itemCategory!: ItemCategory;

  displayedColumns = ["itemCategory", "rating", "status", "year"];
  itemDisplayCategory!: string;

  ngOnInit() {
    const displayCategory = itemDisplayCategories.get(this.itemCategory);
    this.itemDisplayCategory = displayCategory ? displayCategory : "";
  }
}