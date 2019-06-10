import { Component, OnInit } from '@angular/core';
import { Deal } from '../../Entities/Deal';
import { DealService } from 'src/app/Services/deal.service';

@Component({
  selector: 'app-deal-list',
  templateUrl: './deal-list.component.html',
  styleUrls: ['./deal-list.component.sass']
})
export class DealListComponent implements OnInit {

  data:Deal[]=[]

  constructor(private dealService:DealService) { }

  ngOnInit() {
    this.data=this.dealService.getDeals();
  }

}
