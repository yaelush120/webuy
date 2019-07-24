import { Component, OnInit, Input } from "@angular/core";
import { Deal } from "../../Entities/Deal";
import { DatePipe } from "@angular/common";
import { BaseComponent } from "src/app/base/base.component";
import { AuthenticationService } from "src/app/Services/authentication.service.";
import { Router, ActivatedRoute } from "@angular/router";
import { DALService } from "src/app/Services/DAL.service";
import { BaseDealComponent } from "src/app/base/base-deal.component";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-deal",
  templateUrl: "./deal.component.html",
  styleUrls: ["./deal.component.scss"]
})
export class DealComponent extends BaseDealComponent implements OnInit {
  curDate;
  @Input() deal: any;
  showNotification: boolean;
  notificationForm: FormGroup;

  constructor(
    private authS: AuthenticationService,
    private router: Router,
    private dataLayer: DALService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    super(authS, dataLayer);

    this.notificationForm = this.formBuilder.group({
      price: [""],
      date: [""],
      memebers: [""]
    });
  }

  ngOnInit() {
    this.curDate = Date.now();
  }

  //notification
  onSubmit() {
    let newNotification = {
      dealId: this.deal.dealId,
      userId: this.currentUser.userId,
      price: this.notificationForm.controls.price.value==""?null: parseInt(this.notificationForm.controls.price.value),
      memebers: this.notificationForm.controls.memebers.value==""?null:parseInt(this.notificationForm.controls.memebers.value),
      days: this.notificationForm.controls.date.value==""?null:parseInt(this.notificationForm.controls.date.value)
    };

    this.dataLayer.saveNotification(newNotification).subscribe(res => {
      this.showNotification=false;
      alert("הגדרותיך נקלטו במערכת!");
    });
  }
}
