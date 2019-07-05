import { Injectable } from '@angular/core';
import { urlClass } from '../../urlClass';
import {HttpClient, HttpEventType, HttpHeaders } from "@angular/common/http";
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class NisiamainService {

  constructor(private http: HttpClient,
              private url: urlClass,
    private router: Router) { }


  verifyDstvCode(dstvcode) {
    let serviceBody = {
      code: dstvcode,
      name: ''
    };
    return this.http.post(this.url.getUrl() + 'confirmdstvcode', serviceBody);
  }

  checkDstvSubscriber(verifier) {
    let serviceBody = {
      email: verifier.email,
      code: verifier.code
    };
    return this.http.post(this.url.getUrl() + 'checkDstvSubscriberExists', serviceBody);
  }

  getMake()
  {
    return this.http.get(this.url.getUrl() + 'GetMake');
  }

  getModel(makeid){
    let serviceBody =
        {
          id: makeid
        };
    return this.http.post(this.url.getUrl() + 'GetModel', serviceBody) ;
  }

  getstate(){
    return this.http.get(this.url.getUrl() + 'GetState') ;
  }

  getLGA(stateid){
    let serviceBody =
        {
          stateid: stateid
        };
    return this.http.post(this.url.getUrl() + 'GetLga', serviceBody) ;
  }

  GetPolicies() {
    return this.http.get(this.url.getUrl() + 'GetDstvPolicies');
  }

  GetTitles() {
    return this.http.get(this.url.getUrl() + 'GetDstvSubscriberTitles');
  }

  GetIdMeans() {
  return this.http.get(this.url.getUrl() + 'GetDstvSubscriberIdentity');
  }

  GetHouseholdOptions() {
    return this.http.get(this.url.getUrl() + 'GetDstvetHouseHoldOptions');
  }

  GetPersonalAccidentTiers() {
    return this.http.get(this.url.getUrl() + 'GetPersonalAccidentTiers');
  }

  SubmitUserDetails(userDetails) {
    let serviceBody =
    {
       Title : userDetails.title,

      Surname : userDetails.surname,

       FirstName : userDetails.firstName,

      MiddleName : userDetails.middleName,

      SubscriberAddress : userDetails.address,

      DateOfBirth : userDetails.dateOfBirth,

      PhoneNumber : userDetails.phoneNumber,

      EmailAddress : userDetails.email,

      IdentificationType : userDetails.identity,

      IdentificationNumber : userDetails.identityNumber,

       Profession : userDetails.businessType
    };
    return this.http.post(this.url.getUrl() + 'dstvuserdetails', serviceBody) ;
  }

  CalculateDstvPremium(fileToUpload: File[], policyDetails) {
    const formData: FormData = new FormData();
    for (let i = 0; i < fileToUpload.length; i++) { 
      formData.append(fileToUpload[i].name, fileToUpload[i], fileToUpload[i].name);
    }
      const blobOverrides = new Blob([JSON.stringify(policyDetails)], {
        type: 'application/json',
      });
  
      formData.append('policyDetails', blobOverrides);
    console.log(formData);
    return this.http.post(this.url.getUrl() + 'CalculateDstvPremium', formData) ;
  }

  processpayment(paymentParam)
  {
   let serviceBody =
   {
     txnref: paymentParam.txnref,
     payRef: paymentParam.payRef,
     retRef: paymentParam.retRef
   };
   
    return this.http.post(this.url.getUrl() + "dstvretrievedetail", serviceBody);
   
  }
 

}
