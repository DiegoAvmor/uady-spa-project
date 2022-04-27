import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Categories, defaultCategory } from "src/constants";

@Component({
  selector: "app-search-view",
  templateUrl: "./search-view.component.html",
  styleUrls: ["./search-view.component.sass"],
})
export class SearchViewComponent implements OnInit {
  category: Categories = defaultCategory;
  query = "";
  Categories = Categories;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(({ query, category }) => {
      this.query = query;
      if (Object.values(Categories).includes(category)) {
        this.category = category;
      }
    });
  }

  changeCategory(category: Categories): void {
    this.router.navigateByUrl(
      `/search?query=${this.query}&category=${category}`
    );
  }
}
