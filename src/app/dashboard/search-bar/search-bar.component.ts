import { Component, OnInit } from '@angular/core';
import { DALService } from 'src/app/Services/DAL.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  categories:any;

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

}
