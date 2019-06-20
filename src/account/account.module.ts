import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthGuardService } from '../app/services/auth-guard.service';
import {AuthService} from '../app/services/auth.service';
@NgModule({

  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
   providers: [ AuthGuardService, AuthService ],
  declarations: [LoginComponent]
})
export class AccountModule { }
