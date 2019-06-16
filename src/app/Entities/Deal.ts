export class Deal{
    Id:number;
    Name:string;
    Description:string;
    Img:string;
    DueDate:Date;

    constructor(id:number,name:string,description:string,img:string,dueDate:Date) {
        this.Id=id;
        this.Name=name;
        this.Description=description;
        this.Img=img;
        this.DueDate=dueDate;
    }
}