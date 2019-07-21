import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../authentication/login/login.component';
import { SignUpComponent } from '../authentication/sign-up/sign-up.component';

import { AuthenticationRoutingModule } from './authentication-routing.module';

import { ReactiveFormsModule } from '@angular/forms';
import {SelectButtonModule} from 'primeng/selectbutton';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    ReactiveFormsModule,
    SelectButtonModule,
    FormsModule
  ]
})
export class AuthenticationModule { }
