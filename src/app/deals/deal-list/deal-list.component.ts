import { Component, OnInit } from '@angular/core';
import { Deal } from '../../Entities/Deal';
import { BackendService } from 'src/app/Services/backend.service';
import { AuthenticationService } from 'src/app/Services/authentication.service.';
import { User } from 'src/app/Entities/User';
import { BaseComponent } from 'src/app/base/base.component';
import { DALService } from 'src/app/Services/DAL.service';

@Component({
  selector: 'app-deal-list',
  templateUrl: './deal-list.component.html',
  styleUrls: ['./deal-list.component.scss']
})
export class DealListComponent extends BaseComponent {

  data:any

  constructor(private dal:DALService, private authService: AuthenticationService) {
    super(authService);
  }

  ngOnInit() {
    this.dal.getAllDeals().then(x => {
      this.data=x;
    });
  }

}
