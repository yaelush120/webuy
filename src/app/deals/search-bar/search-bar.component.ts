import { Component, OnInit, Input } from "@angular/core";
import { DALService } from "src/app/Services/DAL.service";

@Component({
  selector: "app-search-bar",
  templateUrl: "./search-bar.component.html",
  styleUrls: ["./search-bar.component.scss"]
})
export class SearchBarComponent implements OnInit {

  categories: any;
  rangeDates: Date[];
  rangeValues: number[];
  dateTxt: any;
  freeTxt: string;
  maxPrice: number;
  totalItems:number;

  constructor(private dal: DALService) {
    
    this.maxPrice = this.dal.getAllDealsList().sort((a, b) => (a.currentPrice < b.currentPrice ? 1 : -1))[0].currentPrice;
    this.rangeValues = [0, this.maxPrice];
    this.totalItems=this.dal.getAllDealsList().length;
  }

  ngOnInit() {
    this.dal.getAllCategories().then(x => {
      this.categories = x
        .filter(x => x.level == 1)
        .sort((a, b) => (a.name < b.name ? 1 : -1));
      for (let i = 0; i < this.categories.length; i++) {
        this.categories[i].subMenu = x.filter(
          x => x.parentId == this.categories[i].categoryId
        );
        for (let j = 0; j < this.categories[i].subMenu.length; j++) {
          this.categories[i].subMenu[j].subMenu = x.filter(
            z => z.parentId == this.categories[i].subMenu[j].categoryId
          );
        }
      }
    });
  }
  searchByCategory(categoryId: number) {
    
    var filter = this.dal.getAllDealsList().filter(x => {
      return (
        x.category1 == categoryId ||
        x.category2 == categoryId ||
        x.category3 == categoryId
      );
    });
    this.dal.setAllFilterDealsList(filter);
    this.totalItems=filter.length;

  }

  searchByTxt(txt: string) {

    if (txt.length == 1) {
      return;
    }
    var filter = this.dal.getAllDealsList().filter(x => {
      return x.name.indexOf(txt) > -1 || x.description.indexOf(txt) > -1;
    });
    this.dal.setAllFilterDealsList(filter);
    this.totalItems=filter.length;

  }

  searchByPriceRange(event) {
    
    var filter = this.dal.getAllDealsList().filter(x => {
      return (
        x.currentPrice > event.values[0] && x.currentPrice < event.values[1]
      );
    });
    this.dal.setAllFilterDealsList(filter);
    this.totalItems=filter.length;

  }
  searchBydueDateRange() {
    
    var filter = this.dal.getAllDealsList().filter(x => {
      return (
        new Date(x.dueDate) > this.rangeDates[0] &&
        new Date(x.dueDate) < this.rangeDates[1]
      );
    });
    this.dal.setAllFilterDealsList(filter);
    this.totalItems=filter.length;

  }
  cleanSearch() {
    this.dal.setAllFilterDealsList(this.dal.getAllDealsList());
    this.freeTxt = "";
    this.rangeDates = null;
    this.rangeValues = [0, this.maxPrice];
  }
}
