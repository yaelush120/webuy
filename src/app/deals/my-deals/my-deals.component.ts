import { Component, OnInit } from '@angular/core';
import { DALService } from 'src/app/Services/DAL.service';
import { AuthenticationService } from 'src/app/Services/authentication.service.';
import { BaseComponent } from 'src/app/base/base.component';
import { Router } from '@angular/router';
import { BaseDealComponent } from 'src/app/base/base-deal.component';

@Component({
  selector: 'app-my-deals',
  templateUrl: './my-deals.component.html',
  styleUrls: ['./my-deals.component.scss']
})
export class MyDealsComponent extends BaseDealComponent implements OnInit {

  constructor(private autheticationService: AuthenticationService, private dataLayer: DALService,private router: Router) { 
    super(autheticationService,dataLayer)
  }

 tableSource:[];

  ngOnInit() {
    this.dataLayer.GetUserPersonalDeals(this.currentUser.userId)
      .then(res => {
        this.tableSource = res;
      });
  }
  openDeal(dealId)
  {
    this.router.navigate([`/dashboard/deals/deal-details/${dealId}`]);
  }
}
