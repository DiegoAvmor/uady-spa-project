import { SavedItemType } from "./savedItemType";

export interface SavedItem {
  id: number;
  third_party_item_id: number;
  user_rating: number;
  user_id: number;
  saved_item_type_id: SavedItemType;
}


