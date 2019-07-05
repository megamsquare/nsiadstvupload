import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { NisiamainService } from './../services/nisiamain.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';


@Component({
  selector: 'app-purchase-response',
  templateUrl: './purchase-response.component.html',
  styleUrls: ['./purchase-response.component.css']
})
export class PurchaseResponseComponent implements OnInit {
  transref: string;
  payref: string;
  retref: string;
  responsecode: string;
  responsedesc: string;
  fileURL: any;

  constructor(public route: ActivatedRoute,
              public mainService: NisiamainService,
              public router: Router,
              private ngxService: NgxUiLoaderService

   ) { }

  ngOnInit() {

    this.transref = this.route.snapshot.queryParams.txnRef;
    // this.payref  = this.route.snapshot.queryParams['retRef'];
    // this.retref = this.route.snapshot.queryParams['txnref'];
    this.querypaydetail();
    // this.downloadCert()
  }
  ngAfterViewInit() {
    window.scrollTo(0, 0);
 }
  querypaydetail() {
   const paymentparam = {
       txnref: this.transref,
       payRef: '',
       retRef: ''

    };


   this.mainService.processpayment(paymentparam).
    subscribe(result => {

      this.responsecode = result['responseCode'];
      // tslint:disable-next-line:max-line-length
      this.responsedesc = result['responsedescription'] === '' ? 'Failed Transaction !' : result['responsedescription'];
      this.transref = result['txtref'];
      this.payref = result['payref'];
      this.retref = result['retref'];
      console.log(this.responsecode);

    },
     error => {

        // this.alert.showError(error.responseDescription,"Error!")
        // this.ngProgress.done();

     },

    );
  }

close(){
  this.ngxService.start("policy");
  this.router.navigate(['kyc']);
  this.ngxService.stop("policy");
}

}
