import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path:'',component:DashboardComponent, children:[
    {path:'deals',loadChildren:'../deals/deals.module#DealsModule'},
    {path:'',redirectTo:'deals',pathMatch:'full'}]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
