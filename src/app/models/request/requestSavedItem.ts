import { SavedItemType } from "../savedItemType";

export interface RequestSavedItem {
  third_party_item_id: number;
  user_rating: number;
  type: SavedItemType;
  rating: number;
}
