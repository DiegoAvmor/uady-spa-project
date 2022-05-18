import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/components/model/delete-dialog/delete-dialog.component';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.sass']
})
export class AdminViewComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'action'];
  dataSource:User[] = [];
  isLoading = true;
  error = false;
  success = false;

  constructor(private userService: UserService,public dialog: MatDialog){}

  ngOnInit(): void {
    this.getAllUsers();
  }


  getAllUsers():void{
    this.isLoading = true;
    this.error = false;
    this.success = true;
    this.userService.getAllUsers()
    .subscribe({
      next: (response: User[]) => {
        this.dataSource = response;
        this.isLoading = false;
        this.success = true;
      },
      error: (e) => {
        this.isLoading = false;
        this.error = true;
        this.success = false;
        console.error(e);
      },
      complete: () => {
        this.success = true;
        this.isLoading = false;
      },
    });
  }
  openDeleteDialog(selectedUser:User):void{
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '500px',
      data: { id:selectedUser.id , name: selectedUser.name},
      disableClose: true
    });

    dialogRef.afterClosed().subscribe( () => {
      //Update view with changes
      this.getAllUsers();
    });
  }

}
