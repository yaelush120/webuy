import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DealComponent } from '../deals/deal/deal.component';
import { DealListComponent } from '../deals/deal-list/deal-list.component';
import { DealDetailsComponent } from '../deals/deal-details/deal-details.component';
import { NewDealComponent } from '../deals/new-deal/new-deal.component';
import { DealsRoutingModule } from './deals-routing.module';

@NgModule({
  declarations: [
    DealComponent,
    DealListComponent,
    DealDetailsComponent,
    NewDealComponent
  ],
  imports: [
    CommonModule,
    DealsRoutingModule
  ]
})
export class DealsModule { }
