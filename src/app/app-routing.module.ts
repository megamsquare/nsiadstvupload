import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UploadPageComponent} from './upload-page/upload-page.component';
import { AuthGuardService } from './services/auth-guard.service';
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
