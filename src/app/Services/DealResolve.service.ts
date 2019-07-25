import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { DALService } from './DAL.service';


@Injectable()
export class DealResolve  implements Resolve<any> {

  constructor(private dal: DALService) {

  }

  resolve() {
      return this.dal.getAllDeals().then(y=>{
        this.dal.setAllDealsList(y);
        this.dal.setAllFilterDealsList(y);
      });
      //return this.exservice.GetDescription('/api/ExpertApi/GetDescription?UserGuid='+this.currentUser.UserGuid).then(descriptionData => descriptionData);
    }
}