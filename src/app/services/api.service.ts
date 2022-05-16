import { AuthService } from 'src/app/services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment as env } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private API_BASE_URL = `${env.api.auth.url}`;

  constructor(private http: HttpClient, private authService:AuthService) {

  }


  getAllUsers(): Observable<User[]>{
    return this.http
    .get<User[]>(
      `${this.API_BASE_URL}/users`,
      { headers: this.getAuthorizationHeaders()}
    );
  }


  deleteUser(userId:number): Observable<User>{
    return this.http
    .delete<User>(
      `${this.API_BASE_URL}/users/${userId}`,
      { headers: this.getAuthorizationHeaders()}
    );
  }

  getAuthorizationHeaders(){
    const token = this.authService.getJwtText();
    let requestHeaders = new HttpHeaders();
    return requestHeaders.set('Authorization', `Bearer ${token!}`);
  }

}
