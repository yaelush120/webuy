import { Deal } from './Deal';

export class DealDetails extends Deal{
    PriceHistory:any;
    Members:number;
    Images:string[];

    constructor(id:number,name:string,description:string,img:string,dueDate:Date,startPrice:number=500, currentPrice:number,
        priceHistory:any,members:number,images:string[]) {
        super(id,name,description,img,dueDate,startPrice,currentPrice);
       this.PriceHistory=priceHistory;
       this.Members=members;    
       this.Images=images;

    }
}