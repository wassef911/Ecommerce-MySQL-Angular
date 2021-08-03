import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { map } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  myUser: any;
  constructor(private authService: SocialAuthService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.userData$.pipe(map(user => {
      if (user instanceof SocialUser) return user;
      else return user;
    })).subscribe((data) => {
      this.myUser = data;
    });
    this.authService.authState.pipe(map(user => {
      if (user instanceof SocialUser) return user;
      else return user;
    })).subscribe(user => {
      if (user !== null) this.myUser = user;
      else return
    });
  }

}
