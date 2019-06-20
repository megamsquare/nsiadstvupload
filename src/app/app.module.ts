import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AccountModule } from '../account/account.module';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ToastrModule} from "ngx-toastr";


import { AppComponent } from './app.component';
import { UploadPageComponent } from './upload-page/upload-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NsiaService } from '../nsia.service';
import { AuthGuardService } from './services/auth-guard.service';
import {AuthService} from './services/auth.service';
@NgModule({
  declarations: [
    AppComponent,
    UploadPageComponent
  ],
  imports: [

AccountModule ,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
  BrowserAnimationsModule,
  ToastrModule.forRoot(
    {  timeOut: 20000,
   // positionClass: 'toast-bottom-right',
    preventDuplicates: true,
  }),
  HttpClientModule,
    AppRoutingModule,
    
  ],
  providers: [NsiaService, AuthGuardService, AuthService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
