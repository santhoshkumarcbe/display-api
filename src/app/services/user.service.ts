import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsersUrl = `https://jsonplaceholder.typicode.com/users`
  getUsers(): Observable<User[]> {
    const response = this.http.get<User[]>(this.getUsersUrl);
    console.log(response);
    return response;
  }
}
