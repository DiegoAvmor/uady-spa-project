import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "../../services/api.service";
import { Card } from "../../models/card";
import { Anime } from "../../models/anime";
import { Manga } from "../../models/manga";
import * as $ from "jquery";
@Component({
  selector: "app-home-view",
  templateUrl: "./home-view.component.html",
  styleUrls: ["./home-view.component.css"],
})
export class HomeViewComponent implements OnInit {
  topAnime!: Anime[];
  topManga!: Manga[];
  thisSeason!: Anime[];
  isLoading = true;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.getTopAnime();
    this.getTopManga();
    this.getThisSeason();
    this.topAnimeScroll();
    this.topMangaScroll();
    this.thisSeasonScroll();
  }

  getTopAnime() {
    this.isLoading = true;
    this.apiService.getTopAnime().subscribe({
      next: (response: any) => {
        this.topAnime = response.data;
        console.log(this.topAnime);
      },
      error: (e) => {
        this.isLoading = false;
        //TODO: Redirect to not found
        console.error(e);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  getTopManga() {
    this.isLoading = true;
    this.apiService.getTopManga().subscribe({
      next: (response: any) => {
        this.topManga = response.data;
        console.log(this.topManga);
      },
      error: (e) => {
        this.isLoading = false;
        //TODO: Redirect to not found
        console.error(e);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  getThisSeason() {
    this.isLoading = true;
    this.apiService.getThisSeason().subscribe({
      next: (response: any) => {
        this.thisSeason = response.data;
        console.log(this.thisSeason);
      },
      error: (e) => {
        this.isLoading = false;
        //TODO: Redirect to not found
        console.error(e);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  topAnimeScroll() {
    const carouselWidth = 8000;
    const cardWidth = 600;
    let scrollPosition = 0;

    $("#nextAnimeButton").on("click", function () {
      if (scrollPosition < carouselWidth - cardWidth * 4) {
        //check if you can go any further
        scrollPosition += cardWidth; //update scroll position
        $("#carouselInnerTopAnime").animate(
          { scrollLeft: scrollPosition },
          600
        ); //scroll left
      }
    });

    $("#prevAnimeButton").on("click", function () {
      if (scrollPosition > 0) {
        scrollPosition -= cardWidth;
        $("#carouselInnerTopAnime").animate(
          { scrollLeft: scrollPosition },
          600
        );
      }
    });
  }

  topMangaScroll() {
    const carouselWidth = 8000;
    const cardWidth = 600;
    let scrollPosition = 0;

    $("#nextMangaButton").on("click", function () {
      if (scrollPosition < carouselWidth - cardWidth * 4) {
        //check if you can go any further
        scrollPosition += cardWidth; //update scroll position
        $("#carouselInnerTopManga").animate(
          { scrollLeft: scrollPosition },
          600
        ); //scroll left
      }
    });

    $("#prevMangaButton").on("click", function () {
      if (scrollPosition > 0) {
        scrollPosition -= cardWidth;
        $("#carouselInnerTopManga").animate(
          { scrollLeft: scrollPosition },
          600
        );
      }
    });
  }

  thisSeasonScroll() {
    const carouselWidth = 8000;
    const cardWidth = 600;
    let scrollPosition = 0;

    $("#nextThisSeasonButton").on("click", function () {
      if (scrollPosition < carouselWidth - cardWidth * 4) {
        //check if you can go any further
        scrollPosition += cardWidth; //update scroll position
        $("#carouselInnerThisSeason").animate(
          { scrollLeft: scrollPosition },
          600
        ); //scroll left
      }
    });

    $("#prevThisSeasonButton").on("click", function () {
      if (scrollPosition > 0) {
        scrollPosition -= cardWidth;
        $("#carouselInnerThisSeason").animate(
          { scrollLeft: scrollPosition },
          600
        );
      }
    });
  }

  goToElement(type: string, item: Card) {
    this.router.navigateByUrl(`/resource/${type}/${item.mal_id}`);
  }
}
