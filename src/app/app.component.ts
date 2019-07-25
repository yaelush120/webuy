import { Component, OnInit } from '@angular/core';
import { DALService } from './Services/DAL.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  title = 'webuy';

  constructor() {

  }

  ngOnInit(): void {
   
  }
}
