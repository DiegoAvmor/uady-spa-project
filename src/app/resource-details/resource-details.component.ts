import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ResourceDetails } from './resource-details';

@Component({
  selector: 'app-resource-details',
  templateUrl: './resource-details.component.html',
  styleUrls: ['./resource-details.component.sass']
})
export class ResourceDetailsComponent implements OnInit {

  details!:ResourceDetails;
  isLoading:boolean = true;

  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
    this.getResourceDetailsByNameAndId('anime',23);
  }


 getResourceDetailsByNameAndId(type:string,id:number){
   this.isLoading = true;
    this.apiService.getResourceDetailsByTypeAndId(type,id).subscribe(
      {
        next: (response:any) => {
          this.details = response.data;
          console.log(this.details);
        },
        error: (e) => console.error(e),
        complete: () => {
          this.isLoading = false;
        },
      }
    );
  }



}
