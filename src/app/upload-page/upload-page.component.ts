import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpEventType, HttpHeaders } from "@angular/common/http";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-page',
  templateUrl: './upload-page.component.html',
  styleUrls: ['./upload-page.component.css']
})
export class UploadPageComponent implements OnInit {
selectedFile : File = null;
progress: string;
content: any;
reqHeader = new HttpHeaders({ 
        //'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
     });
  constructor(private http: HttpClient, private toastrService:ToastrService, private router: Router ) { }

  ngOnInit() {
  }



  onFileSelected(event){
    console.log(event);
    this.selectedFile = <File>event.target.files[0]; //binary
    console.log(this.selectedFile);
  }

  onUpload(){
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this.http.post("http://localhost:58698/NSIAMobile/dstvcodeupload", fd, {
      reportProgress: true,
      observe: 'events',
    // hearders: this.reqHeader
    })
    .subscribe(
      event=>{
       if(event.type ===HttpEventType.UploadProgress){
         console.log('Upload progress:' + Math.round(event.loaded/event.total*100) + '%');
         this.progress = 'Upload progress:' + Math.round(event.loaded/event.total*100) + '%';

       }
       else if(event.type ===HttpEventType.Response){
         console.log(event);
         this.content = event.body;
         console.log('content',this.content);
        this.toastrService.success('Success','File uploaded successfuly!',{ progressBar: true })
       }
      },
      error=>{
        //this.toastrService.success('sorry','An error has occured!')
        this.toastrService.error('something is broken', 'Error', {
          timeOut: 3000
        });
        console.log(error)}
    );
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
