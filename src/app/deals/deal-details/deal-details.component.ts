import { Component, OnInit } from "@angular/core";
import { Deal } from "src/app/Entities/Deal";
import { ActivatedRoute, Router, RouterStateSnapshot } from "@angular/router";
import { DALService } from "src/app/Services/DAL.service";
import { extend } from "webdriver-js-extender";
import { BaseComponent } from "src/app/base/base.component";
import { AuthenticationService } from "src/app/Services/authentication.service.";
import { $ } from "protractor";
import { BaseDealComponent } from "src/app/base/base-deal.component";
import { state } from "@angular/animations";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-deal-details",
  templateUrl: "./deal-details.component.html",
  styleUrls: ["./deal-details.component.scss"],
  providers: [MessageService]
})
export class DealDetailsComponent extends BaseDealComponent {
  constructor(
    private authS: AuthenticationService,
    private dataLayer: DALService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private msgService: MessageService
  ) //,private state: RouterStateSnapshot
  {
    super(authS, dataLayer, msgService);
  }
  show = false;
  bidHistory: [];
  deal: any;
  images: any[];
  btnPriceText = "הצעת מחיר";
  showPrice = false;
  priceTxt: number;
  maxPrice: number;
  timeLeft = "aaaa";
  currentPrice: number;
  timerInterval: any;
  basePath = "/assets/saveImg/";

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.deal = this.dataLayer.getAllDealsList().filter(x => {
      return x.dealId == this.activatedRoute.snapshot.paramMap.get("id");
    })[0];

    // this.dataLayer
    //   .getDeal(this.activatedRoute.snapshot.paramMap.get("id"))
    //   .then(res => {
    //    this.deal = res;

        this.images = [];
        if (this.deal.img1 != null)
          this.images.push({ source: this.basePath + this.deal.img1 });
        if (this.deal.img2 != null)
          this.images.push({ source: this.basePath + this.deal.img2 });
        if (this.deal.img3 != null)
          this.images.push({ source: this.basePath + this.deal.img3 });
        if (this.deal.img4 != null)
          this.images.push({ source: this.basePath + this.deal.img4 });

        this.bidHistory = this.dataLayer
          .GetBidHistory(this.activatedRoute.snapshot.paramMap.get("id"))
          .then(x => {
            if (x != null && x.length > 0) {
              this.bidHistory = x.sort((a, b) => (a.date < b.date ? 1 : -1));
              this.maxPrice = this.deal.currentPrice * 0.95;
            } else {
              this.maxPrice = this.deal.startPrice;
            }
          });

        this.getTimeLeft(this.deal.dueDate);
      //});
  }

  onDestroy() {
    clearInterval(this.timerInterval);
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
          //Add Notification
          this.dataLayer.pushNotification(dealId, "price", this.priceTxt);

          this.msgService.add({
            severity: "success",
            summary: "הצעתך נקלטה!",
            detail: ""
          });

          this.priceTxt = 0;
          this.getData();
        }
        if (x == false) {
          this.msgService.add({
            severity: "error",
            summary: "אירעה שגיאה!",
            detail: ""
          });
        }
      });
    } else {
      return;
    }
  }

  login() {
    // this.router.navigate(['/authentication/login'], { queryParams: { returnUrl: state.url}});
    this.router.navigate(["/authentication/login"], {
      queryParams: { returnUrl: document.location.pathname }
    });
  }

  getTimeLeft(countDownDate) {
    var n = new Date().getTime();
    var d = new Date(countDownDate).getTime() - n;
    if (d < 0) {
      //document.getElementById('timeLeft').innerHTML = "הדיל הסתיים";
    } else {
      // Update the count down every 1 second
      this.timerInterval = setInterval(function() {
        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = new Date(countDownDate).getTime() - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
        //document.getElementById('timeLeft').innerHTML =
        // days + "ימים " + hours + ":" + minutes + ":" + seconds;

        // If the count down is finished, write some text
        if (distance < 0) {
          clearInterval(this.timerInterval);
          //document.getElementById("timeLeft").innerHTML = "הדיל הסתיים";
        }
      }, 1000);
    }
  }
}
