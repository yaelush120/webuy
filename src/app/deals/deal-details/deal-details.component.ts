import { Component, OnInit } from "@angular/core";
import { Deal } from "src/app/Entities/Deal";
import { ActivatedRoute, Router } from "@angular/router";
import { DALService } from "src/app/Services/DAL.service";
import { extend } from 'webdriver-js-extender';
import { BaseComponent } from 'src/app/base/base.component';
import { AuthenticationService } from 'src/app/Services/authentication.service.';
import { $ } from 'protractor';

@Component({
  selector: "app-deal-details",
  templateUrl: "./deal-details.component.html",
  styleUrls: ["./deal-details.component.scss"]
})
export class DealDetailsComponent extends BaseComponent {
  constructor(
    private authService: AuthenticationService,
    private dal: DALService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super(authService);
  }

  deal: any;
  images: any[];
  btnPriceText = "הצעת מחיר";
  showPrice = false;
  priceTxt = 0;

  ngOnInit() {
    this.deal = this.dal.getAllDeals().then(x => {
      this.deal = x.filter(
        x => x.dealId == this.route.snapshot.paramMap.get("id")
      )[0];
    });

    this.images = [];
    this.images.push({ source: this.deal.img1 });
    this.images.push({ source: this.deal.img2 });
    this.images.push({ source: this.deal.img3 });
    this.images.push({ source: this.deal.img4 });
    // this.images.push({
    //   source: "assets/showcase/images/demo/galleria/galleria1.jpg",
    //   alt: "Description for Image 1",
    //   title: "Title 1"
    // });
  }

  AddUserToDeal(source) {
    let dealId = this.route.snapshot.paramMap.get("id");
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
        alert(msgSuccess);
      }
      if (x == false) {
        alert(msgError);
      }
    });
  }

  AddBid() {
    if (!this.showPrice) {
      this.btnPriceText = "שלח";
      this.showPrice = true;
      return;
    } 
    else if (this.priceTxt != 0) {
      let dealId = this.route.snapshot.paramMap.get("id");
      let userId = this.currentUser.userId;

      this.dal.AddBid(dealId, userId, this.priceTxt).then(x => {
        if (x == true) {
          alert("הצעתך נקלטה!");
        }
        if (x == false) {
          alert("ארעה שגיאה!");
        }
      });
    } else {
      return;
    }
  }

  login() {
    this.router.navigate(["/authentication/login"],{ queryParams: { returnUrl: '../../../' }});
  }
}
