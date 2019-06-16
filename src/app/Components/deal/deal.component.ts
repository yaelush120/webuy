import { Component, OnInit, Input } from '@angular/core';
import { Deal } from '../../Entities/Deal';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-deal',
  templateUrl: './deal.component.html',
  styleUrls: ['./deal.component.scss']
})
export class DealComponent implements OnInit {

  curDate;
  @Input() deal: Deal;

  constructor() { }

  ngOnInit() {
    this.curDate=Date.now();
  }

}
