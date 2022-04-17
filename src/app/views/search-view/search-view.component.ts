import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Category, defaultCategory } from "src/constants";

@Component({
  selector: "app-search-view",
  templateUrl: "./search-view.component.html",
  styleUrls: ["./search-view.component.sass"],
})
export class SearchViewComponent implements OnInit {
  category: Category = defaultCategory;
  query = "";

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(({ query, category }) => {
      this.query = query;
      if (Object.values(Category).includes(category)) {
        this.category = category;
      }
    });
  }
}
