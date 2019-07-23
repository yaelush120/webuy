import { Component, OnInit } from '@angular/core';
import { User } from '../Entities/User';
import { AuthenticationService } from '../Services/authentication.service.';

@Component({
  selector: "app-base",
  template: ``
})
export class BaseComponent implements OnInit {
  currentUser: User;
  isConnected:boolean;
  isUnConnected:boolean;
  isBuyer:boolean;
  isSupplier:boolean;

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;

      this.isConnected=this.currentUser!=null && this.currentUser!=undefined;
      this.isUnConnected= !this.currentUser;
      this.isBuyer =this.currentUser && this.currentUser.type == 1;
      this.isSupplier = this.currentUser && this.currentUser.type == 2;
    });
  }

  ngOnInit() {}
}
