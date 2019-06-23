import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DealListComponent } from './Components/deal-list/deal-list.component';
import { DealComponent } from './Components/deal/deal.component';
import { LoginComponent } from './Components/login/login.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { DealDetailsComponent } from './Components/deal-details/deal-details.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'sign-up',component:SignUpComponent},
  {path:'deal-list',component:DealListComponent},
  {path:'deal/:id',component:DealDetailsComponent},
  {path:'**',component:DealListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
