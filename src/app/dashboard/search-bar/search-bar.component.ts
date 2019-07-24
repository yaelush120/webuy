import { Component, OnInit } from '@angular/core';
import { DALService } from 'src/app/Services/DAL.service';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  categories:any;
  rangeDates: Date[];
  rangeValues: number[] = [20,80];

  constructor(private dal:DALService) { }

  ngOnInit() {
    this.dal.getAllCategories().then(x => {
      this.categories=x.filter(x => x.level == 1).sort((a, b) => (a.name < b.name) ? 1 : -1);
      for(let i=0;i<this.categories.length;i++)
      {
        this.categories[i].subMenu=x.filter(x => x.parentId == this.categories[i].categoryId);
        for(let j=0;j<this.categories[i].subMenu.length;j++)
        {
          this.categories[i].subMenu[j].subMenu=x.filter(z => z.parentId == this.categories[i].subMenu[j].categoryId);
        }
      }
    });

 
  }
  search(categoryId:number){
    var filter= this.dal.getAllDealsList().filter(x=>{
     return x.category1==categoryId ||  x.category2==categoryId || x.category3==categoryId 
    });
    this.dal.setAllFilterDealsList(filter);
  }
  searchByTxt(txt:string){
    var filter= this.dal.getAllDealsList().filter(x=>{
      return (x.name.indexOf(txt) > -1 || x.description.indexOf(txt) > -1 );
    });
    this.dal.setAllFilterDealsList(filter);

  }
  searchByPriceRange(min:number,max:number){
    var filter= this.dal.getAllDealsList().filter(x=>{
      return (x.currentPrice > min && x.currentPrice <max);
    });
    this.dal.setAllFilterDealsList(filter);

  }
  searchBydueDateRange(startDate:number,endDate:number){
    var filter= this.dal.getAllDealsList().filter(x=>{
      return (x.dueDate > startDate && x.dueDate <endDate);
    });
    this.dal.setAllFilterDealsList(filter);

  }
  cleanSearch(){
    this.dal.setAllFilterDealsList(this.dal.getAllDealsList());
  }

}
