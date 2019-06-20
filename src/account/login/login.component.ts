import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean;

  constructor(private router:Router, private http: HttpClient) { }

  ngOnInit() {
  }

  signIn(credentials) {
    console.log(credentials);
    this.http.post('http://localhost:58698/NSIAMobile/api/authenticate', credentials)
      .subscribe(result => {
        if (result) {
          console.log(result);
          localStorage.setItem('token', result.toString());
          this.router.navigate(['/uploadexcel']);
        }
        else {
          this.invalidLogin = true;
        }
      },
        error => {
          console.log(error);
          this.invalidLogin = true;
        }

      );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  isLoggedIn() {
    
  }
}
 