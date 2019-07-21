import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class DALService {
  private _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  allDeals: any;
  deal:any;
  allCategories: any;
  result:any;

  constructor(private http: HttpClient) {

  }

  getAllDeals() {
    this.allDeals = this.http.get<any>("http://localhost:54267/api/Deal/GetDeals")
    .toPromise()
    .then(res => res = <any[]>res)

    return this.allDeals;
  }

  saveDeal(newDeal:any)
  {
    return this.http.post("http://localhost:54267/api/Deal/SaveDeal",newDeal,this._options)
        .pipe(map(data => {
            return data;
        }));
  }

  saveUser(newUser:any)
  {
    return this.http.post("http://localhost:54267/api/User/SaveUser",newUser,this._options)
        .pipe(map(data => {
            return data;
        }));
  }

  AddUserToDeal(dealId:string,userId:string, isLike=false, isIn=false)
  {
    let url="http://localhost:54267/api/UserInDeal/AddUserToDeal?dealId="+
    dealId+"&userId="+userId+"&isLike="+isLike+"&isIn="+isIn;

    this.result = this.http.get<any>(url)
    .toPromise()
    .then(res => res = <any[]>res)

    return this.result;
  }

  AddBid(dealId:string,userId:string, price:number)
  {
    let url="http://localhost:54267/api/Bid/AddBid?dealId="+
    dealId+"&userId="+userId+"&price="+price;

    this.result = this.http.get<any>(url)
    .toPromise()
    .then(res => res = <any[]>res)

    return this.result;
  }

  getAllCategories() {
    this.allCategories = this.http.get("http://localhost:54267/api/Category/GetCategories")
    .toPromise()
    //.then(res => res = <any[]>res)

    return this.allCategories;
  }
}
