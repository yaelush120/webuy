import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpEventType } from "@angular/common/http";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class DALService {
  
  private _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  deal:any;
  allCategories: any;
  result:any;

  private allDeals = new BehaviorSubject<any>({});
  allDealsObservable = this.allDeals.asObservable();
  
  private fillteredDeals = new BehaviorSubject<any>({});
  fillteredDealsObservable = this.fillteredDeals.asObservable();
  
  

  constructor(private http: HttpClient) {

  }
  getAllDealsList() {
    return this.allDeals.getValue();
  }
  setAllDealsList(list:any) {
    this.allDeals.next(list);
  }
  getAllFilterDealsList() {
    return this.fillteredDeals.getValue();
  }
  setAllFilterDealsList(list:any) {
    this.fillteredDeals.next(list);
  }
  getAllDeals() {
   var allDeal=  this.http.get<any>("http://localhost:54267/api/Deal/GetDeals")
    .toPromise()
    .then(res => res = <any[]>res)

    return allDeal;
  }

  GetUserPersonalDeals(userId)
  {
    this.result = this.http.get<any>("http://localhost:54267/api/Deal/GetUserPersonalDeals?userId="+userId)
    .toPromise()
    .then(res => res = <any[]>res)

    return this.result;
  }

  getDeal(dealId) {
    this.deal = this.http.get<any>(`http://localhost:54267/api/Deal/GetDeal?dealId=${dealId}`)
    .toPromise()
    .then(res => res = <any[]>res)

    return this.deal;
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

  GetBidHistory(dealId) {
    this.allCategories = this.http.get(`http://localhost:54267/api/Bid/GetBidHistory?dealId=${dealId}`)
    .toPromise()

    return this.allCategories;
  }

  getAllCategories() {
    this.allCategories = this.http.get("http://localhost:54267/api/Category/GetCategories")
    .toPromise()
    //.then(res => res = <any[]>res)

    return this.allCategories;
  }

  uploadImages(files:any)
  {
    if(files.length>0)
    {
      files.forEach(x => {
        let fileToUpload = <File>x;
        const formData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);
     
        this.http.post('http://localhost:54267/api/Deal/Upload', formData, {reportProgress: true, observe: 'events'})
          .subscribe(event => {
            if (event.type === HttpEventType.UploadProgress){}
              // this.progress = Math.round(100 * event.loaded / event.total);
            else if (event.type === HttpEventType.Response) {
              // this.message = 'Upload success.';
              // this.onUploadFinished.emit(event.body);
            }
          });
        
      });
    }
    
  }
}
