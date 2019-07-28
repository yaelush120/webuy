import { Component, OnInit } from '@angular/core';
import { User } from '../Entities/User';
import { AuthenticationService } from '../Services/authentication.service.';
import { BaseComponent } from './base.component';
import { ActivatedRoute } from '@angular/router';
import { DALService } from '../Services/DAL.service';
import { MessageService } from "primeng/api";

@Component({
  selector: 'app-base-deal',
  template: ``,
  providers: [MessageService]
})

export class BaseDealComponent extends BaseComponent implements OnInit {

  currentUser: User;

  constructor(private authService: AuthenticationService,private dal: DALService,private messageService: MessageService) {
    super(authService);
  }

  ngOnInit() {
  }

  AddUserToDeal(source, deal=null) {
    let dealId = deal.dealId;
    let userId = this.currentUser.userId;
    let isLike = source == "like" ? true : false;
    let isIn = source == "addMe" ? true : false;
    let msgSuccess = isLike ? "התווסף למועדפים!" : isIn ? "הצטרפת לקבוצה!" : "";
    let msgError = isLike
      ? "התווסף בעבר למועדפים!"
      : isIn
      ? "הצטרפת בעבר לקבוצה זו!"
      : "";

    this.dal.AddUserToDeal(dealId, userId, isLike, isIn).then(x => {
      if (x == true) {
        if(isLike)
        {
          deal.likesCount+=1;
        }
        else if(isIn)
        {
          deal.inCount+=1;
          //Add Notification
          this.dal.pushNotification(deal.dealId,'members',deal.inCount);
        }

        this.messageService.add({
          severity: "success",
          summary: msgSuccess,
          detail: ""
        });
      }
      if (x == false) {
   
        this.messageService.add({
          severity: "error",
          summary: msgError,
          detail: ""
        });
      }
    });
  }
}
