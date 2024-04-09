import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-display-api-data',
  templateUrl: './display-api-data.component.html',
  styleUrls: ['./display-api-data.component.scss'],
  standalone: true
})
export class DisplayApiDataComponent {

  constructor(private userService: UserService){}

  users!: User[];

  ngOnInit(){
    this.userService.getUsers().subscribe({
      next: data => {
        this.users = data;
        console.log(this.users);
        
      },
      error: error => {
        console.error(error);
      }
    })
  }



}
