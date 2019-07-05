import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NisiamainService } from './../services/nisiamain.service';
import { urlClass } from '../../urlClass';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-kyc',
  templateUrl: './kyc.component.html',
  styleUrls: ['./kyc.component.css']
})
export class KycComponent implements OnInit {
  titles: any;
  userDetailsForm: FormGroup;
  identities: any;
  userId: string;
  fistKyc= true;

  constructor(private fb: FormBuilder,
              private router: Router,
              public urlclass: urlClass,
              public mainService: NisiamainService,
              private toastrService:ToastrService,
              private ngxService: NgxUiLoaderService) { }

  ngOnInit() {
    if(urlClass.code == null){
      this.ngxService.start("verify");
      this.router.navigate(['verify']);
       this.ngxService.stop("verify");
    }
    this.getTitles();
    this.getMeansOfId();

    this.userDetailsForm = this.fb.group({
      'title': [null,
        Validators.compose([
          Validators.required,
         // Validators.minLength(10),
         // Validators.maxLength(10)
        ])],
      'surname': [null,
          Validators.compose([
            Validators.required,
            Validators.minLength(3)
          ])],
      'middleName': [null,
          Validators.compose([
            Validators.required,
            Validators.minLength(3)
            ])],
      'firstName': [null,
        Validators.compose([
          Validators.required,
          Validators.minLength(3)
          ])],
      'dateOfBirth': [null,
        Validators.compose([
          Validators.required
        ])],
      'phoneNumber': [null,
        Validators.compose([
          Validators.required,
          Validators.minLength(10)
        ])],
      'email': [null,
        Validators.compose([
          Validators.required,
          Validators.email
        ])],
      'identity': [null,
        Validators.compose([
          Validators.required
        ])],
      'identityNumber': [null,
        Validators.compose([
          Validators.required
        ])],
      'businessType': ['',
        Validators.compose([
          Validators.required,
          Validators.minLength(3)
        ])],
      'address': [null,
        Validators.compose([
          Validators.required,
          Validators.minLength(3)
        ])],

    });

  }


  saveFirstKyc() {
    this.fistKyc = false;
  }

  submitUserDetails(userDetails) {
    console.log(userDetails);
    this.ngxService.start("userdetail");
    this.mainService.SubmitUserDetails(userDetails).subscribe(
      result => {
        console.log(`result`, result);
        urlClass.userId = result['id'];
        this.router.navigate(['policies']);
        this.ngxService.stop("userdetail");
      },
      error => {
        this.ngxService.stop("userdetail");
        console.log(error);
      }
    );
  }





  getTitles() {
    this.ngxService.start("title");
    this.mainService.GetTitles().subscribe(
      result => {
        this.titles = result;
        this.ngxService.stop("title");
      },
      error => {
        this.ngxService.start();
        console.log(error);
        this.ngxService.stop("title");
      }
    );
  }

  getMeansOfId() {
    this.ngxService.start("mid");
    this.mainService.GetIdMeans().subscribe(
      result => {
        this.identities = result;
        this.ngxService.stop("mid");
      },
      error => {
        console.log(error);
        this.ngxService.stop("mid");
      }
    );
  }

}
