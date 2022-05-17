import { SavedItem } from './savedItem';
import { ItemDetails } from "./item-details";

export interface ProfileSavedItem {
  apiItem: SavedItem,
  jikanItem: ItemDetails,
  url: string
}
