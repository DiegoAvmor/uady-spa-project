import { Card, Images } from "./card";

export class Manga implements Card {
  mal_id: number;
  images: Images;
  title: string;
}
