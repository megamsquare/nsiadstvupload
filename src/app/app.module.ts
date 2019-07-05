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
import { KycComponent } from './kyc/kyc.component';
import { PolicyOptionsComponent } from './policy-options/policy-options.component';
import { PurchaseResponseComponent } from './purchase-response/purchase-response.component';
import { NisiamainService } from './services/nisiamain.service';
import { urlClass } from 'src/urlClass';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { VerifyDstvCodeComponent } from './verify-dstv-code/verify-dstv-code.component';

@NgModule({
  declarations: [
    AppComponent,
    UploadPageComponent,
    KycComponent,
    PolicyOptionsComponent,
    PurchaseResponseComponent,
    VerifyDstvCodeComponent
  ],
  imports: [

AccountModule ,
    BrowserModule,
    NgxUiLoaderModule,
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
  providers: [NsiaService, AuthGuardService, AuthService , NisiamainService, urlClass],
  bootstrap: [AppComponent]
})
export class AppModule { }
