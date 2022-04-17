import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Anime } from './anime';
import { Manga } from './manga';
import * as $ from 'jquery'
@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css']
})
export class HomeViewComponent implements OnInit {

  topAnime !: Anime[];
  topManga !: Manga[];
  thisSeason !: Anime[];
  isLoading : boolean = true;

  constructor(private apiService:ApiService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getTopAnime();
    //this.getTopManga();
    //this.getThisSeason();
    this.scrollCarousel()
  }

  getTopAnime(){
    this.isLoading = true;
    this.apiService.getTopAnime().subscribe(
      {
        next: (response:any) => {
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
      }
    );
  }

  getTopManga(){
    this.isLoading = true;
    this.apiService.getTopManga ().subscribe(
      {
        next: (response:any) => {
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
      }
    );
  }

  getThisSeason(){
    this.isLoading = true;
    this.apiService.getThisSeason().subscribe(
      {
        next: (response:any) => {
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
      }
    );
  }

  scrollCarousel(){
    var carouselWidth = 8000;
    var cardWidth = 600;
    var scrollPosition = 0;

    $(".carousel-control-next").on("click", function () {
      if (scrollPosition < (carouselWidth - cardWidth * 4)) { //check if you can go any further
        scrollPosition += cardWidth;  //update scroll position
        $(".carousel-inner").animate({ scrollLeft: scrollPosition },600); //scroll left
      }
    });

    $(".carousel-control-prev").on("click", function () {
      if (scrollPosition > 0) {
        scrollPosition -= cardWidth;
        $(".carousel-inner").animate(
          { scrollLeft: scrollPosition },
          600
        );
      }
    });
  }

}
