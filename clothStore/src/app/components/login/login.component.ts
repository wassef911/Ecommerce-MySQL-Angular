import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  constructor(private authService: SocialAuthService, private userService: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userService.authState$.subscribe((authState) => {
      if (authState) {
        this.router.navigateByUrl(this.route.snapshot.queryParams["returnUrl"] || "/profile")
      } else {
        this.router.navigateByUrl("/login");
      }
    })
  }
  signInWithGoogle() {
    this.userService.googleLogin();
  }
  login(form: NgForm) {
    const email = this.email;
    const password = this.password;
    if (form.invalid) {
      return;
    }
    form.reset();
    this.userService.loginUser(email, password);
  }

}
