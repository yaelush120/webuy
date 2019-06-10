import { Component, OnInit, Input } from '@angular/core';
import { Deal } from '../../Entities/Deal';

@Component({
  selector: 'app-deal',
  templateUrl: './deal.component.html',
  styleUrls: ['./deal.component.scss']
})
export class DealComponent implements OnInit {

  @Input() deal: Deal;

  constructor() { }

  ngOnInit() {
  }

}
