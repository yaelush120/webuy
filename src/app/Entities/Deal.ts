export class Deal{
    Id:number;
    Name:string;
    Description:string;
    Img:string;

    constructor(id:number,name:string,description:string,img:string) {
        this.Id=id;
        this.Name=name;
        this.Description=description;
        this.Img=img;
    }
}