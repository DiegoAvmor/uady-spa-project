import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ApiService } from "../../services/api.service";
import { ResourceDetails } from "../../models/resource-details";

@Component({
  selector: "app-resource-details",
  templateUrl: "./resource-details-view.component.html",
  styleUrls: ["./resource-details-view.component.sass"],
})
export class ResourceDetailsView implements OnInit {
  details!: ResourceDetails;
  isLoading: boolean = true;
  isRated: boolean = true;
  isSaved: boolean = true;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    //Get resource name and id from url
    let resourceName = <string>this.route.snapshot.paramMap.get("type");
    let resourceId = <string>this.route.snapshot.paramMap.get("id");
    //Get current resource data from the API
    this.getResourceDetailsByNameAndId(resourceName, resourceId);
    //TODO: Implement method to obtain the personal rating of the resource
  }

  getResourceDetailsByNameAndId(type: string, id: string) {
    this.isLoading = true;
    this.apiService.getResourceDetailsByTypeAndId(type, id).subscribe({
      next: (response: any) => {
        this.details = response.data;
        console.log(this.details);
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
}
