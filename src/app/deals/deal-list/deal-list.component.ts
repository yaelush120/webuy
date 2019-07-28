import { Component, OnInit, Input } from '@angular/core';
import { Deal } from '../../Entities/Deal';
import { AuthenticationService } from 'src/app/Services/authentication.service.';
import { User } from 'src/app/Entities/User';
import { BaseComponent } from 'src/app/base/base.component';
import { DALService } from 'src/app/Services/DAL.service';


@Component({
  selector: 'app-deal-list',
  templateUrl: './deal-list.component.html',
  styleUrls: ['./deal-list.component.scss']
})
export class DealListComponent extends BaseComponent {

  data:any;
  maxPriceRange:number;


  constructor(private dal:DALService, private authService: AuthenticationService) {
    super(authService);
  }

  ngOnInit() {
    this.data=this.dal.getAllDealsList();

    this.dal.fillteredDealsObservable.subscribe(x=>{
      this.data=x;
    })
    // this.dal.getAllDeals().then(y=>{
    //   this.dal.setAllDealsList(y);
    //   this.dal.setAllFilterDealsList(y);
    //   this.data= y;
    // })
    // this.dal.fillteredDealsObservable.subscribe(x=>{
    //   this.data=x;
    // })



    // this.dal.getAllDeals().then(x => {
    //   this.data=x;
    //   this.dal.setAllDealsList(x);
    // });
  }

}
