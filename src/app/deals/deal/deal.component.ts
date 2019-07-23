import { Component, OnInit, Input } from '@angular/core';
import { Deal } from '../../Entities/Deal';
import { DatePipe } from '@angular/common';
import { BaseComponent } from 'src/app/base/base.component';
import { AuthenticationService } from 'src/app/Services/authentication.service.';
import { Router, ActivatedRoute } from '@angular/router';
import { DALService } from 'src/app/Services/DAL.service';
import { BaseDealComponent } from 'src/app/base/base-deal.component';

@Component({
  selector: 'app-deal',
  templateUrl: './deal.component.html',
  styleUrls: ['./deal.component.scss']
})
export class DealComponent extends BaseDealComponent implements OnInit {

  curDate;
  @Input() deal: any;

  constructor(private authS: AuthenticationService,private router: Router, private dataLayer: DALService,private activatedRoute: ActivatedRoute) {
    super(authS,dataLayer);
   }

  ngOnInit() {
    this.curDate=Date.now();
  }
}
