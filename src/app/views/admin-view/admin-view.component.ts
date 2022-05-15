import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/components/model/delete-dialog/delete-dialog.component';
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

  constructor(private apiService: ApiService,public dialog: MatDialog){}

  ngOnInit(): void {
    this.getAllUsers();
  }


  getAllUsers():void{
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
  openDeleteDialog(selectedUser:User):void{
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '500px',
      data: { id:selectedUser.id , name: selectedUser.name},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
