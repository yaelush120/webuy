import { Component, OnInit, Input } from '@angular/core';
import { Deal } from '../../Entities/Deal';
import { DatePipe } from '@angular/common';
import { BaseComponent } from 'src/app/base/base.component';
import { AuthenticationService } from 'src/app/Services/authentication.service.';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deal',
  templateUrl: './deal.component.html',
  styleUrls: ['./deal.component.scss']
})
export class DealComponent extends BaseComponent implements OnInit {

  curDate;
  @Input() deal: any;

  constructor(private authService: AuthenticationService,private router: Router) {
    super(authService);
   }

  ngOnInit() {
    this.curDate=Date.now();
  }

  addMember()
  {
    if(!this.currentUser)
    {
      this.router.navigate(['/authentication/login']);
    }
  }

  addLikes()
  {
    
  }
}
