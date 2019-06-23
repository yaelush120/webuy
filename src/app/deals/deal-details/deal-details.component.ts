import { Component, OnInit } from '@angular/core';
import { Deal } from 'src/app/Entities/Deal';
import { DealService } from 'src/app/Services/deal.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-deal-details',
  templateUrl: './deal-details.component.html',
  styleUrls: ['./deal-details.component.scss']
})
export class DealDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private dealService:DealService) { }

  deal:Deal;

  ngOnInit() {
    this.deal=this.dealService.getDealDetails(this.route.snapshot.paramMap.get("id"));
  }

}
