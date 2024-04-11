import { Component, Inject, inject, Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DialogData } from '../models/dialogdata.model';

@Component({
  selector: 'app-display-api-data',
  templateUrl: './display-api-data.component.html',
  styleUrls: ['./display-api-data.component.scss'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule,MatDialogModule, MatFormFieldModule, FormsModule],
})
export class DisplayApiDataComponent {

  constructor(private http: HttpClient, public dialog: MatDialog) { }

  users!: User[];
  animal!: string;
  name!: string;

  ngOnInit() {
    this.getUsers().subscribe({
      next: data => {
        this.users = data;
        console.log(this.users);
      },
      error: error => {
        console.error(error);
      }
    })
  }

  getUsersUrl = `https://jsonplaceholder.typicode.com/users`
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.getUsersUrl);
  }

  openDialog(user:User): void {
    console.log(user);
    
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      data:user,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}

