import { Component, OnInit, AfterContentInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { JikanService } from "../../services/jikan.service";
import { HomeViewCard } from "../../models/home-view-card";
import { Anime } from "../../models/anime";
import { Manga } from "../../models/manga";
import * as $ from "jquery";
@Component({
  selector: "app-home-view",
  templateUrl: "./home-view.component.html",
  styleUrls: ["./home-view.component.sass"],
})
export class HomeViewComponent implements OnInit {
  topAnime!: Anime[];
  topManga!: Manga[];
  thisSeason!: Anime[];
  isThisSeasonLoading = true;
  isTopMangaLoading = true;
  isTopAnimeLoading = true;

  constructor(private apiService: JikanService, private route: Router) {}

  ngOnInit(): void {
    this.getTopAnime();
    this.getTopManga();
    this.getThisSeason();
    this.topAnimeScroll();
    this.topMangaScroll();
    this.thisSeasonScroll();
  }

  getTopAnime() {
    this.isTopAnimeLoading = true;
    this.apiService.getTopAnime().subscribe({
      next: (response: any) => {
        this.topAnime = response.data;
        console.log(this.topAnime);
      },
      error: (e) => {
        this.isTopAnimeLoading = false;
        //TODO: Redirect to not found
        console.error(e);
      },
      complete: () => {
        this.isTopAnimeLoading = false;
      },
    });
  }

  getTopManga() {
    this.isTopMangaLoading = true;
    this.apiService.getTopManga().subscribe({
      next: (response: any) => {
        this.topManga = response.data;
        console.log(this.topManga);
      },
      error: (e) => {
        this.isTopMangaLoading = false;
        //TODO: Redirect to not found
        console.error(e);
      },
      complete: () => {
        this.isTopMangaLoading = false;
      },
    });
  }

  getThisSeason() {
    this.isThisSeasonLoading = true;
    this.apiService.getThisSeason().subscribe({
      next: (response: any) => {
        this.thisSeason = response.data;
        console.log(this.thisSeason);
      },
      error: (e) => {
        this.isThisSeasonLoading = false;
        //TODO: Redirect to not found
        console.error(e);
      },
      complete: () => {
        this.isThisSeasonLoading = false;
      },
    });
  }

  topAnimeScroll() {
    const carouselWidth = 8000;
    const cardWidth = 600;
    let scrollPosition = 0;

    $("#next-anime-button").on("click", function () {
      if (scrollPosition < carouselWidth - cardWidth * 4) {
        //check if you can go any further
        scrollPosition += cardWidth; //update scroll position
        $("#carousel-inner-top-anime").animate(
          { scrollLeft: scrollPosition },
          600
        ); //scroll left
      }
    });

    $("#prev-anime-button").on("click", function () {
      if (scrollPosition > 0) {
        scrollPosition -= cardWidth;
        $("#carousel-inner-top-anime").animate(
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

    $("#next-manga-button").on("click", function () {
      if (scrollPosition < carouselWidth - cardWidth * 4) {
        //check if you can go any further
        scrollPosition += cardWidth; //update scroll position
        $("#carousel-inner-top-manga").animate(
          { scrollLeft: scrollPosition },
          600
        ); //scroll left
      }
    });

    $("#prev-manga-button").on("click", function () {
      if (scrollPosition > 0) {
        scrollPosition -= cardWidth;
        $("#carousel-inner-top-manga").animate(
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

    $("#next-this-season-button").on("click", function () {
      if (scrollPosition < carouselWidth - cardWidth * 4) {
        //check if you can go any further
        scrollPosition += cardWidth; //update scroll position
        $("#carousel-inner-this-season").animate(
          { scrollLeft: scrollPosition },
          600
        ); //scroll left
      }
    });

    $("#prev-this-season-button").on("click", function () {
      if (scrollPosition > 0) {
        scrollPosition -= cardWidth;
        $("#carousel-inner-this-season").animate(
          { scrollLeft: scrollPosition },
          600
        );
      }
    });
  }

  goToElement(type: string, item: HomeViewCard) {
    this.route.navigateByUrl(`/resource/${type}/${item.mal_id}`);
  }
}
