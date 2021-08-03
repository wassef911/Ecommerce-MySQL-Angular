import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  auth = false;
  private SERVER_URL = environment.SERVER_URL;
  private user: any;
  authState$ = new BehaviorSubject<boolean>(this.auth);
  userData$ = new BehaviorSubject<SocialUser | ResponseModal | null>(null);
  constructor(private authService: SocialAuthService, private httpClient: HttpClient) {
    authService.authState.subscribe(((user: SocialUser) => {
      if (user != null) {
        this.auth = true;
        this.authState$.next(this.auth);
        this.userData$.next(user);
      }
    }))
  }
  // login with email and password
  loginUser(email: string, password: string) {
    this.httpClient.post(this.SERVER_URL + "/auth/login", { email, password }).subscribe((data: any) => {
      this.auth = data.auth;
      this.authState$.next(this.auth);
      this.userData$.next(data);
    });
  }
  // googlize authentication xDDD 
  googleLogin() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  logout() {
    this.authService.signOut();
    this.auth = false;
    this.authState$.next(this.auth);
  }
}

export interface ResponseModal {
  token: string;
  auth: boolean;
  email: string;
  username: string;
  fname: string;
  lname: string;
  photoUrl: string;
  userId: number;
}