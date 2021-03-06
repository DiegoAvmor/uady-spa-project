import { ItemGenre } from "./item-genre";

export interface ItemDetails {
  mal_id: number;
  url: string;
  images: any;
  title: string;
  title_english: string;
  title_japanese: string;
  title_synonyms: string[];
  type: string;
  status: string;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: string;
  genres: ItemGenre[];
}
