import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DealListComponent } from './deal-list/deal-list.component';
import { DealDetailsComponent } from './deal-details/deal-details.component';
import { NewDealComponent } from './new-deal/new-deal.component';
import { MyDealsComponent } from './my-deals/my-deals.component';

const routes: Routes = [
 {path:'new-deal',component:NewDealComponent},
 {path:'deal-list',component:DealListComponent},
 {path:'deal-details/:id',component:DealDetailsComponent},
 {path:'my-deals',component:MyDealsComponent},
 {path:'',redirectTo:'deal-list',pathMatch:'full'},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DealsRoutingModule { }
