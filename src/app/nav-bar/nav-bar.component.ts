import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "src/app/Services/authentication.service.";
import { User } from "src/app/Entities/User";
import { extend } from 'webdriver-js-extender';
import { BaseComponent } from 'src/app/base/base.component';
import { Router } from '@angular/router';

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.scss"]
})
export class NavBarComponent extends BaseComponent implements OnInit {
  currentUser: User;

  constructor(private authService: AuthenticationService,private router: Router) {
    super(authService);
  }

  ngOnInit() {}

  logout()
  {
    this.authService.logout();
    this.router.navigate(["/"]);
  }
}
