import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { DALService } from "./DAL.service";

@Injectable()
export class DealResolve implements Resolve<any> {
  constructor(private dal: DALService) {}

  resolve() {
    if (this.dal.getDealsListExist() && localStorage.getItem("lastSignIn") != null) {
      return this.dal.getNewDeals(localStorage.getItem("lastSignIn"))
        .then(y => {
          //update all deals list
          localStorage.setItem("lastSignIn", this.getNowDateFormat());
          if (y.length > 0) {
            var allDeals = this.dal.getAllDealsList();
            // for(let i=0;i<y.length;i++)
            // {
            //   allDeals.insert(i,y[i]);
            // }
            y.forEach(element => {
              allDeals.unshift(element);
            });
            this.dal.setAllDealsList(allDeals);
            this.dal.setAllFilterDealsList(allDeals);
          }
        });
    } else {
      return this.dal.getAllDeals().then(y => {
        localStorage.setItem("lastSignIn", this.getNowDateFormat());
        this.dal.setAllDealsList(y);
        this.dal.setAllFilterDealsList(y);
      });
    }
  }

  getNowDateFormat() {
    var date = new Date();
    var day = date.getDate(); // yields date
    var month = date.getMonth() + 1; // yields month (add one as '.getMonth()' is zero indexed)
    var year = date.getFullYear(); // yields year
    var hour = date.getHours(); // yields hours
    var minute = date.getMinutes(); // yields minutes
    var second = date.getSeconds(); // yields seconds

    // After this construct a string with the above results as below
    var time =
      day + "/" + month + "/" + year + " " + hour + ":" + minute + ":" + second;

    return time;
  }
}
