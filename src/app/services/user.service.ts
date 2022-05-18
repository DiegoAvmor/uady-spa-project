import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment as env } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_BASE_URL = `${env.api.auth.url}`;

  constructor(private http: HttpClient, private authService:AuthService) {

  }


  getAllUsers(): Observable<User[]>{
    return this.http
    .get<User[]>(
      `${this.API_BASE_URL}/users`,
      { headers: this.authService.getAuthorizationHeaders()}
    );
  }


  deleteUser(userId:number): Observable<User>{
    return this.http
    .delete<User>(
      `${this.API_BASE_URL}/users/${userId}`,
      { headers: this.authService.getAuthorizationHeaders()}
    );
  }


}
