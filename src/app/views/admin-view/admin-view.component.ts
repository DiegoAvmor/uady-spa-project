import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.sass']
})
export class AdminViewComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'action'];
  dataSource:User[] = [];
  isLoading = true;

  constructor(private apiService: ApiService,){}

  ngOnInit(): void {
    this.getAllUsers();
  }


  getAllUsers(){
    this.apiService.getAllUsers()
    .subscribe({
      next: (response: User[]) => {
        this.dataSource = response;
        console.log(response);
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
