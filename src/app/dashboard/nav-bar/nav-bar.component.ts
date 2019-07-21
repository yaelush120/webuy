import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "src/app/Services/authentication.service.";
import { User } from "src/app/Entities/User";

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.scss"]
})
export class NavBarComponent implements OnInit {
  currentUser: User;

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {}

  logout()
  {
    this.authenticationService.logout();
  }
}
