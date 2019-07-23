import { Component, OnInit } from "@angular/core";
import { Deal } from "src/app/Entities/Deal";
import { ActivatedRoute, Router } from "@angular/router";
import { DALService } from "src/app/Services/DAL.service";
import { extend } from "webdriver-js-extender";
import { BaseComponent } from "src/app/base/base.component";
import { AuthenticationService } from "src/app/Services/authentication.service.";
import { $ } from "protractor";
import { BaseDealComponent } from "src/app/base/base-deal.component";

@Component({
  selector: "app-deal-details",
  templateUrl: "./deal-details.component.html",
  styleUrls: ["./deal-details.component.scss"]
})
export class DealDetailsComponent extends BaseDealComponent {
  constructor(
    private authS: AuthenticationService,
    private dataLayer: DALService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    super(authS, dataLayer);
  }

  bidHistory: [];
  deal: any;
  images: any[];
  btnPriceText = "הצעת מחיר";
  showPrice = false;
  priceTxt = 0;
  maxPrice: number;
  timeLeft;
  currentPrice: number;

  ngOnInit() {
    this.getData();

    // this.images = [];
    // this.images.push({ source: this.deal.img1 });
    // this.images.push({ source: this.deal.img2 });
    // this.images.push({ source: this.deal.img3 });
    // this.images.push({ source: this.deal.img4 });
    // this.images.push({
    //   source: "assets/showcase/images/demo/galleria/galleria1.jpg",
    //   alt: "Description for Image 1",
    //   title: "Title 1"
    // });
  }

  getData() {
    this.dataLayer
      .getDeal(this.activatedRoute.snapshot.paramMap.get("id"))
      .then(res => {
        this.deal = res;

        this.bidHistory = this.dataLayer
          .GetBidHistory(this.activatedRoute.snapshot.paramMap.get("id"))
          .then(x => {
            if (x != null && x.length > 0) {
              this.bidHistory = x.sort((a, b) => (a.date < b.date ? 1 : -1));
              this.maxPrice = this.deal.currentPrice * 0.95;
            }
            else{
              this.maxPrice = this.deal.startPrice;
            } 
          });

        //this.timeLeft = new Date( new Date(this.deal.dueDate).getTime() - new Date().getTime());
        this.timeLeft = this.deal.dueDate;
      });
  }

  AddBid() {
    if (!this.showPrice) {
      this.btnPriceText = "שלח";
      this.showPrice = true;
      return;
    } else if (this.priceTxt != 0) {
      let dealId = this.activatedRoute.snapshot.paramMap.get("id");
      let userId = this.currentUser.userId;

      this.dataLayer.AddBid(dealId, userId, this.priceTxt).then(x => {
        if (x == true) {
          alert("הצעתך נקלטה!");
          this.priceTxt=0;
          this.getData();

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
    this.router.navigate(["/authentication/login"], {
      queryParams: { returnUrl: "../../../" }
    });
  }
}
