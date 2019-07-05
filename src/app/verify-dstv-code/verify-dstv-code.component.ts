import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NisiamainService } from './../services/nisiamain.service';
import { urlClass } from '../../urlClass';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-verify-dstv-code',
  templateUrl: './verify-dstv-code.component.html',
  styleUrls: ['./verify-dstv-code.component.css']
})
export class VerifyDstvCodeComponent implements OnInit {
  error: boolean;
  verifyForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              public urlclass: urlClass,
              public mainService: NisiamainService,
              private toastrService: ToastrService,
              private ngxService: NgxUiLoaderService) { }

  ngOnInit() {
    this.verifyForm = this.fb.group({
      dstvcode: [null,
        Validators.compose([
          Validators.required,
          // Validators.minLength(10),
          // Validators.maxLength(10)
        ])],
        dstvemail: [null,
          Validators.compose([
            Validators.required,
            // Validators.minLength(10),
            // Validators.maxLength(10)
          ])],
    });
  }

  verifyCode(verifier) {
    let verif = {
      email: verifier.dstvemail,
      code: verifier.dstvcode
    };
    this.ngxService.start('verify');
    this.mainService.verifyDstvCode(verif.code).subscribe(
      result => {
       // console.log(result);
        urlClass.code = verifier.dstvcode;
        //check if user already exists
        this.mainService.checkDstvSubscriber(verif).subscribe(
          res => {
            console.log(res);
            if (res['exists']) {
              this.ngxService.stop('verify');
              urlClass.userId = res['subscriberId'];
              this.router.navigate(['policies']);
              
            } else {
              this.ngxService.stop('verify');
              this.router.navigate(['kyc']);
           }
          },
          err => {
            console.log(err);
            this.ngxService.stop('verify');
            this.error = true;
          }
        );
       
      },
      error => {
        console.log(error);
        this.ngxService.stop('verify');
        this.error = true;
      }
    );
  }

  retry(){
  this.error = false;
  }
}
