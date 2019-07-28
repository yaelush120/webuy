import { Component, OnInit, Input } from "@angular/core";
import { Deal } from "../../Entities/Deal";
import { DatePipe } from "@angular/common";
import { BaseComponent } from "src/app/base/base.component";
import { AuthenticationService } from "src/app/Services/authentication.service.";
import { Router, ActivatedRoute } from "@angular/router";
import { DALService } from "src/app/Services/DAL.service";
import { BaseDealComponent } from "src/app/base/base-deal.component";
import { FormGroup, FormBuilder } from "@angular/forms";
import { MessageService } from 'primeng/api';

@Component({
  selector: "app-deal",
  templateUrl: "./deal.component.html",
  styleUrls: ["./deal.component.scss"],
  providers: [MessageService]
})
export class DealComponent extends BaseDealComponent implements OnInit {
  curDate;
  timeOver:boolean;
  @Input() deal: any;
  showNotification: boolean;
  notificationForm: FormGroup;
   hrefLink:string;

  constructor(
    private authS: AuthenticationService,
    private router: Router,
    private dataLayer: DALService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private msgService: MessageService
  ) {
    super(authS, dataLayer,msgService);

    this.notificationForm = this.formBuilder.group({
      price: [""],
      date: [""],
      memebers: [""]
    });
  }

  ngOnInit() {
    this.curDate = Date.now();
    var now = new Date().getTime();
    var distance = new Date(this.deal.dueDate).getTime() - now;
    this.timeOver = distance > 0 ;
    if(this.currentUser != null)
      // this.hrefLink ="https://api.whatsapp.com/send?phone=972"+this.currentUser.phone+"&text=webuy";
      var curentUrl ="מצאתי דיל שיכול לעניין אותך: ";
        this.hrefLink ="https://web.whatsapp.com/send?text=" + curentUrl + this.deal.description+ "http://localhost:4200/dashboard/deals/deal-details/"+this.deal.dealId;
  }

  //notification
  onSubmit() {
    let newNotification = {
      dealId: this.deal.dealId,
      userId: this.currentUser.userId,
      price: this.notificationForm.controls.price.value==""?null: parseInt(this.notificationForm.controls.price.value),
      members: this.notificationForm.controls.memebers.value==""?null:parseInt(this.notificationForm.controls.memebers.value),
      days: this.notificationForm.controls.date.value==""?null:parseInt(this.notificationForm.controls.date.value)
    };

    this.dataLayer.saveNotification(newNotification).subscribe(res => {
      this.showNotification=false;
      this.msgService.add({
        severity: "success",
        summary: "הגדרותיך נקלטו במערכת!",
        detail: ""
      });
    });
  }
}
