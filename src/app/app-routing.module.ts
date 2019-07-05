import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UploadPageComponent} from './upload-page/upload-page.component';
import { AuthGuardService } from './services/auth-guard.service';
import { KycComponent } from './kyc/kyc.component';
import { PolicyOptionsComponent } from './policy-options/policy-options.component';
import { PurchaseResponseComponent } from './purchase-response/purchase-response.component';
import { VerifyDstvCodeComponent } from './verify-dstv-code/verify-dstv-code.component';
const routes: Routes = [
  // {
  //   path: 'account',
  //   loadChildren: './account/account.module#AccountModule'
  // },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'

  },
  {
    path:'uploadexcel',
    component:UploadPageComponent,
    canActivate: [AuthGuardService]
  },
  {
    path:'verify',
    component:VerifyDstvCodeComponent,
  },
  {
    path:'kyc',
    component:KycComponent,
  },
  {
    path:'policies',
    component:PolicyOptionsComponent,
  },
  {
    path:'dstvthanks-purchaseresponse',
    component:PurchaseResponseComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
