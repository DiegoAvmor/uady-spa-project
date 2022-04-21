import { Component, OnInit, AfterContentInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
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

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

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

  goToElement(type: string, item: Card) {
    console.log(type);
    console.log(item.mal_id);
  }
}
