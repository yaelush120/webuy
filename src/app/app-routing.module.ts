import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DealListComponent } from './deals/deal-list/deal-list.component';
import { DealComponent } from './deals/deal/deal.component';
import { DealDetailsComponent } from './deals/deal-details/deal-details.component';
import { NewDealComponent } from './deals/new-deal/new-deal.component';

const routes: Routes = [
  {path:'authentication',loadChildren:'./authentication/authentication.module#AuthenticationModule'},
  {path:'dashboard',loadChildren:'./dashboard/dashboard.module#DashboardModule'},
  {path:'',redirectTo:'dashboard',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
