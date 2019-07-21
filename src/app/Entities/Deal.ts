export class Deal{
    Id:number;
    Name:string;
    Description:string;
    Img:string;
    DueDate:Date;
    StartPrice:number;
    CurrentPrice:number;

    constructor(id:number,name:string,description:string,img:string,dueDate:Date,startPrice:number=500, currentPrice:number=300) {
        this.Id=id;
        this.Name=name;
        this.Description=description;
        this.Img=img;
        this.DueDate=dueDate;
        this.StartPrice=startPrice;
        this.CurrentPrice=currentPrice;
    }
}