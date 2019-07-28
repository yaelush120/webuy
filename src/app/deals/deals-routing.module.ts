import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DealListComponent } from './deal-list/deal-list.component';
import { DealDetailsComponent } from './deal-details/deal-details.component';
import { NewDealComponent } from './new-deal/new-deal.component';
import { MyDealsComponent } from './my-deals/my-deals.component';
import { DealResolve } from '../Services/DealResolve.service';
import { AuthGuard } from '../Services/auth.guard';

const routes: Routes = [
 {path:'new-deal',component:NewDealComponent, canActivate: [AuthGuard]},
 {path:'deal-list',component:DealListComponent,resolve:{dealData:DealResolve}},
 {path:'deal-details/:id',component:DealDetailsComponent,resolve:{dealData:DealResolve}},
 {path:'my-deals',component:MyDealsComponent, canActivate: [AuthGuard]},
 {path:'',redirectTo:'deal-list',pathMatch:'full'},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DealsRoutingModule { }
