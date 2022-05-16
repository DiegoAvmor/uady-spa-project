import { ApiService } from 'src/app/services/api.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.sass']
})
export class DeleteDialogComponent implements OnInit {

  showError = false;
  showSuccess = false;

  constructor(
    private apiService: ApiService,
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  deleteUser(userId:number){
    this.showError = false;
    this.showSuccess = false;
    this.apiService.deleteUser(userId).subscribe({
      next: (response) => {
        this.showSuccess = true;
        console.log(response);
      },
      error: (e) => {
        this.showError = true;
        console.log(e);
      }
    });
  }

  ngOnInit(): void {}

}
