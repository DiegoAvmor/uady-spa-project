import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment as env } from "src/environments/environment";
import { DomEvents } from "../config/DomEvents";
import { LocalStorageKeys } from "../config/LocalStorageKeys";
import { AuthData } from "../models/auth-data";
import { Jwt } from "../models/jwt";
import { UserSession } from "../models/user-session";
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

  authenticateUser(userCredentials: UserCredentials): Observable<AuthData> {
    return this.http.post<AuthData>(
      `${this.API_BASE_URL}/login`,
      userCredentials
    );
  }

  updateUserSession(jwtText: string): void {
    localStorage.setItem(LocalStorageKeys.JWT, jwtText);
    window.dispatchEvent(new Event(DomEvents.UPDATE_USER_SESSION));
  }

  getUserSessionSync(): UserSession | null {
    const jwtText = this.getJwtText();
    if (jwtText === null) return null;
    return {
      jwt: new Jwt(jwtText),
    } as UserSession;
  }

  getUserSession(): Observable<UserSession | null> {
    return new Observable((observer) => {
      if (!DomEvents.added[DomEvents.UPDATE_USER_SESSION]) {
        window.addEventListener(
          DomEvents.UPDATE_USER_SESSION,
          () => {
            const jwtText = this.getJwtText();
            if (jwtText === null) {
              observer.next(null);
              return;
            }
            observer.next({
              jwt: new Jwt(jwtText),
            } as UserSession);
          },
          false
        );
      }
    });
  }

  private getJwtText(): string | null {
    return localStorage.getItem(LocalStorageKeys.JWT);
  }
}
