import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Anime } from './anime';
import { Manga } from './manga';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.sass']
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

}
