import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NisiamainService } from './../services/nisiamain.service';
import { urlClass } from '../../urlClass';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpEventType, HttpHeaders } from "@angular/common/http";
import {ImageResult, ResizeOptions} from 'ng2-imageupload'

@Component({
  selector: 'app-policy-options',
  templateUrl: './policy-options.component.html',
  styleUrls: ['./policy-options.component.css']
})
export class PolicyOptionsComponent implements OnInit {
  premiumDetailsForm: FormGroup;
  policies: any;
  homeOptions: any;
  policy: string;
  hidePolicySelect: boolean;
  assets = [];
  show: boolean;
  sumInsured: number;
  assetLocation: string;
  finalSubmission: boolean;
  inAssetLocation: boolean;
  calculatePremium: boolean;
  calculatePremiumFail: boolean;
  inDescription= false;
  hideSum: boolean;
  showHome = false;
  inBuilding = true;
  showPersonal = false;
  personalOptions: any;
  userPremiumDetails: any;
  vehicleMakes: Object;
  vehicleModels: Object;
  houseLocation: boolean;

  resizeOptions: ResizeOptions =
  {
    resizeMaxHeight:128,
    resizeMaxWidth: 128
    };

  @ViewChild('fileinput1') filevariable1: any;
  @ViewChild('fileinput2') filevariable2:any;

  src: string;
  imageResult: File = null;
  fileToUpload: File[] = [];

  OutputData =
    {
      cust_name: '',
      amount: 0,
      premiumstring: '',
      cust_id: '',
      txn_ref: '',
      BusinessClass: '',
      hash: '',
      originalPremium: '',
      product_id: 6205,
      pay_item_id: 101,
      site_redirect_url: '',
      currency: 566
    };
  percentDiscount: number;
  verifyMinimumSumInsured: boolean;
  nextOrCalculatePremium: any;


  constructor(private fb: FormBuilder,
              private router: Router,
              public urlclass: urlClass,
              public mainService: NisiamainService,
              private http: HttpClient,
              private toastrService: ToastrService,
              private ngxService: NgxUiLoaderService) { }

  ngOnInit() {
    if(urlClass.code == null){
      this.ngxService.start("verify");
      this.router.navigate(['verify']);
       this.ngxService.stop("verify");
    }
    this.getPolicies();
    this.getHomeOptions();
    this.getPersonalOptions();
    this.getVehicleMake();

    this.premiumDetailsForm = this.fb.group({
      policy: [null,
        Validators.compose([
          Validators.required,
         // Validators.minLength(10),
         // Validators.maxLength(10)
        ])],
        home: [null,
          Validators.compose([
            Validators.required,
           // Validators.minLength(10),
           // Validators.maxLength(10)
          ])],
        personal: [null,
            Validators.compose([
              Validators.required,
             // Validators.minLength(10),
             // Validators.maxLength(10)
            ])],
      sumInsured: [null,
          Validators.compose([
            Validators.required,

          ])],
      assetLocation: [null,
          Validators.compose([
            Validators.required,
            Validators.minLength(3)
            ])],
       assetDescription: [null,
        Validators.compose([
          Validators.required,
        ])],
       vehicleMake: [null,
          Validators.compose([
            Validators.required
          ])],
      vehicleModel: [null,
          Validators.compose([
            Validators.required
          ])],
      vehicleDate: [null,
          Validators.compose([
            Validators.required
      ])],
      vehicleReg: [null,
        Validators.compose([
          Validators.required,
        ])],
      vehicleChasis: [null,
        Validators.compose([
          Validators.required,
        ])],
      vehicleEngine: [null,
        Validators.compose([
          Validators.required,
        ])],
      exteriorFrontView: [null,
        Validators.compose([
          Validators.required,
        ])],
      exteriorLeftHandSideView: [null,
        Validators.compose([

        ])],
      exteriorRightHandSideFrontView: [null,
        Validators.compose([
          Validators.required,
        ])],
      exteriorRightHandSideRearView: [null,
        Validators.compose([
          Validators.required,
        ])],
      interiorView: [null,
          Validators.compose([
            Validators.required,
          ])],
      dashboard: [null,
          Validators.compose([
            Validators.required,
        ])],
        plateChasisNumber: [null,
              Validators.compose([
                Validators.required,
      ])],

      assetDescriptionName: [null,
        Validators.compose([
          Validators.required,
        ])],
      assetDeclaredPrice: [null,
        Validators.compose([
          Validators.required,
      ])],
      buildingExteriorView: [null,
        Validators.compose([
          Validators.required,
      ])],
      buildingInteriorView1: [null,
        Validators.compose([
          Validators.required,
        ])],
        buildingInteriorView2: [null,
        Validators.compose([
          Validators.required,
      ])],
          });

  }

  gotoSumInsured(premiumDetails) {
    this.policy = premiumDetails.policy;
    if (this.policy != null) {
      this.hidePolicySelect = true;
    }

  }

  gotoAssetLocation(premiumDetails) {
    if ((premiumDetails.policy === "1") || (premiumDetails.policy === '2')) {
      console.log('location');

      this.inDescription = !this.inDescription;
      this.hideSum = true;

    } else {
      if (premiumDetails.policy === "3" && this.premiumDetailsForm.controls.home.value === '1') {
        this.houseLocation = true;
      }
      this.inDescription = true;
    }
    this.sumInsured = premiumDetails.sumInsured.toString();
    console.log(this.policy);
    if (this.policy != null) {
      this.inAssetLocation = !this.inAssetLocation;
      this.inBuilding = false;
    }
    console.log(`inAssetLocation`,this.inAssetLocation);
    console.log(`inDescription`,this.inDescription);
  }

  gotoCalculateHousePremium(premiumDetails) {
    console.log(premiumDetails);
    console.log(this.policy);
    if ((premiumDetails.policy === '1') || (premiumDetails.policy === '2')) {
      console.log('here');
      this.inDescription = !this.inDescription;
      this.calculatePremium = false;
      this.calculatePremiumFail = false;
    } else {
      this.hideSum = false;
      this.assetLocation = premiumDetails.assetLocation;
      this.CalculatePremiumDetails();

    }

  }

   submitUserPremiumDetails(premiumDetail) {

   }

   homeSelected() {
     if (this.premiumDetailsForm.controls.home.value === '2') {
       this.showHome = true;
    }
   }

  personSelected() {
    console.log(this.premiumDetailsForm);
    if (this.premiumDetailsForm.controls.policy.value === '4' || this.premiumDetailsForm.controls.policy.value === '1' || this.premiumDetailsForm.controls.policy.value === '2') {
      this.showHome = true;
      if (this.premiumDetailsForm.controls.policy.value === '4') {
        if (this.premiumDetailsForm.controls.personal.value === '1') {
          this.premiumDetailsForm.controls['sumInsured'].setValue('150');
        }
        if (this.premiumDetailsForm.controls.personal.value === '2') {
          this.premiumDetailsForm.controls['sumInsured'].setValue('350');
        }
        if (this.premiumDetailsForm.controls.personal.value === '3') {
          this.premiumDetailsForm.controls['sumInsured'].setValue('750');
        }
      }
     // this.showPersonal = true;
     }


  }

  addToAssetTable(premiumDetails) {
    console.log(premiumDetails);
    const assetDetail = {
      assetName: premiumDetails.assetDescriptionName,
      assetPrice: premiumDetails.assetDeclaredPrice
    };
    this.assets.push(assetDetail);
    console.log(this.assets);
    this.sumInsured = 0;
    this.assets.forEach(item => this.sumInsured = this.sumInsured + item.assetPrice);
    this.premiumDetailsForm.controls.sumInsured.setValue(this.sumInsured);
    this.premiumDetailsForm.controls.assetDescriptionName.reset();
    this.premiumDetailsForm.controls.assetDeclaredPrice.reset();


    this.show = true;
  }

  editAsset(i) {
    this.premiumDetailsForm.controls.assetDescriptionName.setValue(this.assets[i].assetName);
    this.premiumDetailsForm.controls.assetDeclaredPrice.setValue(this.assets[i].assetPrice);

    this.deleteAsset(i);
  }

  deleteAsset(i) {
   // let assetSum = this.premiumDetailsForm.controls['sumInsured'].value;
    this.sumInsured = this.sumInsured - (this.assets[i].assetPrice);
    this.premiumDetailsForm.controls.sumInsured.setValue(this.sumInsured);

    this.assets.splice(i, 1);
    if (this.assets.length < 1) {
      this.sumInsured = 0;
      this.show = false;
    }
  }

  CalculatePremiumDetails() {
    console.log(`All details`, this.premiumDetailsForm.value);

    this.userPremiumDetails = this.premiumDetailsForm.value;



    let serviceBody = {
      DstvSubscriberId: Number(urlClass.userId),
     //DstvSubscriberId: '1004',
      DstvPolicy: Number(this.userPremiumDetails.policy),
      HomeType: this.userPremiumDetails.home == null ? '': this.userPremiumDetails.home.toString(),
      PersonalAccident: this.userPremiumDetails.personal== null ? '' : this.userPremiumDetails.personal.toString(),
      SumInsured: this.userPremiumDetails.sumInsured.toString(),
      AnnualEmolument: this.userPremiumDetails.policy === '4' ? this.userPremiumDetails.sumInsured.toString() : '',
      AssetDescription: this.userPremiumDetails.assetDescription == null ? '' : this.userPremiumDetails.assetDescription,
      VehicleDate: this.userPremiumDetails.vehicleDate == null ? '' : this.userPremiumDetails.vehicleDate,
      VehicleMake: this.userPremiumDetails.vehicleMake == null ? '' : this.userPremiumDetails.vehicleMake,
      VehicleModel: this.userPremiumDetails.vehicleModel == null ? '' : this.userPremiumDetails.vehicleModel,
      Location: this.userPremiumDetails.assetLocation == null ? '' : this.userPremiumDetails.assetLocation,
      PromoCode: urlClass.code.toString(),
     // PromoCode: '',
      VehicleReg: this.userPremiumDetails.vehicleReg == null ? '' : this.userPremiumDetails.vehicleReg,
      Chasis: this.userPremiumDetails.vehicleChasis == null ? '' : this.userPremiumDetails.vehicleChasis,
      EngineNumbers: this.userPremiumDetails.vehicleEngine == null ? '' : this.userPremiumDetails.vehicleEngine,

    };

    if (this.userPremiumDetails.policy === '1' || this.userPremiumDetails.policy === '2') {
      serviceBody.AssetDescription = serviceBody.AssetDescription + "|" +
        serviceBody.VehicleMake + "|" + serviceBody.VehicleModel + "|" + serviceBody.VehicleDate;

    }

    if(this.userPremiumDetails.policy === '3' && this.premiumDetailsForm.controls.home.value === '2'){
      this.assets.forEach(item => serviceBody.AssetDescription = serviceBody.AssetDescription + item.assetName + "-" + item.assetPrice + "");
    }
  console.log(serviceBody);
    let formData: FormData = new FormData();

    formData.append('serviceBody', JSON.stringify(serviceBody));
    if((this.userPremiumDetails.policy === '3' && this.premiumDetailsForm.controls.home.value === '2') || this.userPremiumDetails.policy === '4'){
      this.ngxService.start("policy");
      return this.http.post(this.urlclass.getUrl() + 'CalculateDstvPremium', formData).subscribe(
        result => {
          console.log(result);
          console.log(result);
          this.OutputData.product_id = result['product_id'];
          this.OutputData.cust_id = result['cust_id'];
          this.OutputData.cust_name = result['customerName'];
          this.OutputData.pay_item_id = result['payItemId'];
          this.OutputData.amount = result['premiumString'];
          this.OutputData.currency = result['currency'];
          this.OutputData.site_redirect_url = result['redirect_url'];
          this.OutputData.txn_ref = result['transactionRefNo'];
          this.OutputData.hash = result['hash'];
          this.OutputData.BusinessClass = result['businessClass'];
          this.OutputData.premiumstring = result['premium'];
          this.OutputData.originalPremium = result['originalPremium'];
          this.percentDiscount = result['originalPremium'] - result['premium'];

          this.calculatePremium = true;
          this.calculatePremiumFail = false;
          this.ngxService.stop("policy");
        },
        error=>{
          console.log(error);
          this.calculatePremium = false;
          this.calculatePremiumFail = true;
          this.ngxService.stop("policy");
        }
      );
    }
    else{
      this.fileToUpload.forEach(x=> formData.append(x.name, x, x.name));
      console.log(formData);
      this.ngxService.start("policy");
      return this.http.post(this.urlclass.getUrl() + 'CalculateDstvPremium', formData).subscribe(
      result => {
          console.log(result);
          this.OutputData.product_id = result['product_id'];
          this.OutputData.cust_id = result['cust_id'];
          this.OutputData.cust_name = result['customerName'];
          this.OutputData.pay_item_id = result['payItemId'];
          this.OutputData.amount = result['premiumString'];
          this.OutputData.currency = result['currency'];
          this.OutputData.site_redirect_url = result['redirect_url'];
          this.OutputData.txn_ref = result['transactionRefNo'];
          this.OutputData.hash = result['hash'];
          this.OutputData.BusinessClass = result['businessClass'];
          this.OutputData.premiumstring = result['premium'];
          this.OutputData.originalPremium = result['originalPremium'];
          this.percentDiscount = result['originalPremium'] - result['premium'];
          this.calculatePremium = true;
          this.calculatePremiumFail = false;


          this.ngxService.stop("policy");
      },
      error=>{
        console.log(error);
        this.calculatePremium = false;
        this.calculatePremiumFail = true;
        this.ngxService.stop("policy");
      }
    );
  }



  }

  getPolicies() {
    this.mainService.GetPolicies().subscribe(
      result => {
        this.policies = result;
      },
      error => {
        console.log(error);
      }
    );
  }

  getHomeOptions() {
    this.mainService.GetHouseholdOptions().subscribe(
      result => {
        console.log(result);
        this.homeOptions = result;
      },
      error => {
        console.log(error);
      }
    );
  }

  getPersonalOptions() {
    this.mainService.GetPersonalAccidentTiers().subscribe(
      result => {
        console.log(result);
        this.personalOptions = result;
      },
      error => {
        console.log(error);
      }
    );
  }

  getVehicleMake() {
    this.mainService.getMake().subscribe(
      result => {console.log(result);
                 this.vehicleMakes = result;
      },
      error => {
        console.log(error);
      });
  }

  getVehicleModel(id) {
    console.log(id);
    this.mainService.getModel(id).subscribe(
      result => {
        console.log(result);
        this.vehicleModels = result;
      },
      error => {
        console.log(error);
      });
  }

  selected1(event) {
    this.imageResult = <File>event.target.files[0];
     console.log(this.imageResult);
     let imageResult = this.imageResult;
     const ext = [ 'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/bmp' ];
    if (ext.indexOf(imageResult.type) === -1) {
      this.toastrService.error('File format is not accepted', 'Error', {
        timeOut: 3000
      });
      return;
    } else if (imageResult.size > 4000000) {
      this.toastrService.error('File size must not be greater than 4mb', 'Error', {
        timeOut: 3000
      });
      return;
    }
    this.fileToUpload.push(this.imageResult);
    console.log(this.fileToUpload);
   }


  onFileChange1(event) {
    let myfiles: any;
    myfiles = event.target.files;
    this.userPremiumDetails.filename1Id = myfiles[0].name;
    this.userPremiumDetails.filetype1Id = myfiles[0].type;
    const reader = new FileReader();
    reader.onload = this._handleReaderLoaded1.bind(this);
    reader.readAsBinaryString(myfiles[0]);
  }
  _handleReaderLoaded1(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.userPremiumDetails.filestring1Id = btoa(binaryString);  // Converting binary string data.
  }

  onFileChange2(event) {
    let myfiles: any;
    myfiles = event.target.files;
    this.userPremiumDetails.filename2Id = myfiles[0].name;
    this.userPremiumDetails.filetype2Id = myfiles[0].type;
    const reader = new FileReader();
    reader.onload = this._handleReaderLoaded2.bind(this);
    reader.readAsBinaryString(myfiles[0]);
  }
  _handleReaderLoaded2(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.userPremiumDetails.filestring2Id = btoa(binaryString);  // Converting binary string data.
  }

  onFileChange3(event) {
    let myfiles: any;
    myfiles = event.target.files;
    this.userPremiumDetails.filename3Id = myfiles[0].name;
    this.userPremiumDetails.filetype3Id = myfiles[0].type;
    const reader = new FileReader();
    reader.onload = this._handleReaderLoaded3.bind(this);
    reader.readAsBinaryString(myfiles[0]);
  }
  _handleReaderLoaded3(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.userPremiumDetails.filestring3Id = btoa(binaryString);  // Converting binary string data.
  }

  onFileChange4(event) {
    let myfiles: any;
    myfiles = event.target.files;
    this.userPremiumDetails.filename4Id = myfiles[0].name;
    this.userPremiumDetails.filetype4Id = myfiles[0].type;
    const reader = new FileReader();
    reader.onload = this._handleReaderLoaded4.bind(this);
    reader.readAsBinaryString(myfiles[0]);
  }
  _handleReaderLoaded4(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.userPremiumDetails.filestring4Id = btoa(binaryString);  // Converting binary string data.
  }

  onFileChange5(event) {
    let myfiles: any;
    myfiles = event.target.files;
    this.userPremiumDetails.filename5Id = myfiles[0].name;
    this.userPremiumDetails.filetype5Id = myfiles[0].type;
    const reader = new FileReader();
    reader.onload = this._handleReaderLoaded5.bind(this);
    reader.readAsBinaryString(myfiles[0]);
  }
  _handleReaderLoaded5(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.userPremiumDetails.filestring5Id = btoa(binaryString);  // Converting binary string data.
  }

  onFileChange6(event) {
    let myfiles: any;
    myfiles = event.target.files;
    this.userPremiumDetails.filename6Id = myfiles[0].name;
    this.userPremiumDetails.filetype6Id = myfiles[0].type;
    const reader = new FileReader();
    reader.onload = this._handleReaderLoaded6.bind(this);
    reader.readAsBinaryString(myfiles[0]);
  }
  _handleReaderLoaded6(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.userPremiumDetails.filestring6Id = btoa(binaryString);  // Converting binary string data.
  }

  onFileChange7(event) {
    let myfiles: any;
    myfiles = event.target.files;
    this.userPremiumDetails.filename7Id = myfiles[0].name;
    this.userPremiumDetails.filetype7Id = myfiles[0].type;
    const reader = new FileReader();
    reader.onload = this._handleReaderLoaded7.bind(this);
    reader.readAsBinaryString(myfiles[0]);
  }
  _handleReaderLoaded7(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.userPremiumDetails.filestring7Id = btoa(binaryString);  // Converting binary string data.
  }

  gotoPolicies(){
    this.ngxService.start("policy");
    this.router.navigate(['policies']);
    this.ngxService.stop("policy");
  }

  checkMimimumAmount(sumInsured) {
    return this.verifyMinimumSumInsured = sumInsured >= 1000000;
  }

  changeButtonLabel() {
    if (!(this.premiumDetailsForm.controls.policy.value === '4')) {
     return this.nextOrCalculatePremium = 'Next';
    }
    else {
      return this.nextOrCalculatePremium = 'Calculate Premium';
    }
  }

}
