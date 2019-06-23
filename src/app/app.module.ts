import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { DealComponent } from './Components/deal/deal.component';
import { DealListComponent } from './Components/deal-list/deal-list.component';
import { SearchBarComponent } from './Components/search-bar/search-bar.component';
import { DealDetailsComponent } from './Components/deal-details/deal-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    NavBarComponent,
    DealComponent,
    DealListComponent,
    SearchBarComponent,
    DealDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
