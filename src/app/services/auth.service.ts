import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
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

  createUser(user: User): Observable<User | HttpErrorResponse> {
    return this.http
      .post<User | HttpErrorResponse>(`${this.API_BASE_URL}/signup`, user)
      .pipe(
        tap((res) => {
          if (env.log.debug && res instanceof HttpErrorResponse) {
            console.error("Error creating user", res);
            return;
          }
          env.log.debug && console.log("Success. User created", res);
        })
      );
  }

  getJwt(
    userCredentials: UserCredentials
  ): Observable<AuthData | HttpErrorResponse> {
    return this.http
      .post<AuthData | HttpErrorResponse>(
        `${this.API_BASE_URL}/login`,
        userCredentials
      )
      .pipe(
        tap((res) => {
          if (env.log.debug && res instanceof HttpErrorResponse) {
            console.error("Error signing in the user", res);
            return;
          }
          env.log.debug && console.log("Success. User signed in", res);
        })
      );
  }
}
