import { Component, OnInit } from '@angular/core';
import { User } from '../Entities/User';
import { AuthenticationService } from '../Services/authentication.service.';

@Component({
  selector: 'app-base',
  template: ``
})

export class BaseComponent implements OnInit {

  currentUser: User;

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
  }

}
