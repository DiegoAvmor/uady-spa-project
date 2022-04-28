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

const range =
  (start: number) =>
  (end: number): number[] =>
    start === end ? [start] : [start, ...range(start + 1)(end)];

@Component({
  selector: "app-search-view",
  templateUrl: "./search-view.component.html",
  styleUrls: ["./search-view.component.sass"],
})
export class SearchViewComponent implements OnInit {
  category: Categories = defaultCategory;
  query = "";
  Categories = Categories;
  currentPage = 1;
  items: Array<Anime | Manga> = [];
  max_pages = 1;
  range = range;

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

      this.searchPage(this.currentPage).then(({ pagination }) => {
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
        console.log("page response:", data);
        console.log("page number:", page);
        this.items = data;
        this.currentPage = page;
      })
    );
  }

  changeCategory(category: Categories): void {
    this.router.navigateByUrl(
      `/search?query=${this.query}&category=${category}`
    );
  }

  selectItem(id: string | number): void {
    this.router.navigateByUrl(`/resource/${this.category}/${id}`);
  }

  hasPagination() {
    return this.max_pages > 1;
  }

  hasPreviousPage() {
    return this.currentPage > 1;
  }

  hasNextPage() {
    return this.currentPage < this.max_pages;
  }
}
