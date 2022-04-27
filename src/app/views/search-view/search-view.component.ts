import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { lastValueFrom } from "rxjs";
import { Anime } from "src/app/models/anime";
import { Manga } from "src/app/models/manga";
import { ApiService } from "src/app/services/api.service";
import { Categories, defaultCategory } from "src/constants";

function sideEffect<Val>(effect: (_: Val) => unknown) {
  return (value: Val) => {
    effect(value);
    return value;
  };
}

@Component({
  selector: "app-search-view",
  templateUrl: "./search-view.component.html",
  styleUrls: ["./search-view.component.sass"],
})
export class SearchViewComponent implements OnInit {
  category: Categories = defaultCategory;
  query = "";
  Categories = Categories;
  page = 1;
  items: Array<Anime | Manga> = [];
  max_pages = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(({ query, category }) => {
      this.query = query;
      if (Object.values(Categories).includes(category)) {
        this.category = category;
      }

      this.searchPage(this.page).then(({ pagination }) => {
        this.max_pages = pagination.last_visible_page;
      });
    });
  }

  searchPage(page: number) {
    const observable =
      this.category === Categories.ANIME
        ? this.apiService.searchAnime(this.query, page)
        : this.apiService.searchManga(this.query, page);

    return lastValueFrom(observable).then(
      sideEffect(({ data }) => {
        this.items = data;
      })
    );
  }

  changeCategory(category: Categories): void {
    this.router.navigateByUrl(
      `/search?query=${this.query}&category=${category}`
    );
  }
}
