import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment as env } from "src/environments/environment";
import { AuthData } from "../models/auth-data";
import { User } from "../models/user";
import { UserCredentials } from "../models/user-credentials";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private API_BASE_URL = `${env.api.auth.url}/auth`;

  constructor(private http: HttpClient) {}

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.API_BASE_URL}/signup`, user);
  }

  getJwt(userCredentials: UserCredentials): Observable<AuthData> {
    return this.http.post<AuthData>(
      `${this.API_BASE_URL}/login`,
      userCredentials
    );
  }
}
