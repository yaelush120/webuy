import { Component, OnInit } from '@angular/core';
import { User } from '../Entities/User';
import { AuthenticationService } from '../Services/authentication.service.';
import { BaseComponent } from './base.component';
import { ActivatedRoute } from '@angular/router';
import { DALService } from '../Services/DAL.service';

@Component({
  selector: 'app-base-deal',
  template: ``
})

export class BaseDealComponent extends BaseComponent implements OnInit {

  currentUser: User;

  constructor(private authService: AuthenticationService,private dal: DALService) {
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
        }

        alert(msgSuccess);
      }
      if (x == false) {
        alert(msgError);
      }
    });
  }
}
