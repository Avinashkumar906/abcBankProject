

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { API_URLS } from 'src/app/core/constants/api-urls';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { NewsService } from 'src/app/core/services/news.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  userId: String = '';
  password: String = '';
  error = 'User is not Valid.Please enter valid Username';
  isUserInvalid = false;
  loading3=false;

  constructor(
    private fb: FormBuilder, 
    private route: Router,
    public appService: NewsService
  ) { }


  ngOnInit() {

    this.loginForm = this.fb.group({
      'userId': [null, Validators.required],
      'password': [null, Validators.required]
    });

    if (!_.isNull(sessionStorage.getItem('userInfo'))) {
      this.route.navigate(['/home']);
    }
   // this.appService.adminPanel.next(false);
  }
  onFormSubmit(form: any) {
    this.loading3=true;
    if (!_.isEmpty(form)) {
      const path = 'api/access/';
      let body = {
        "email_address": form.value.userId,
        "password": form.value.password
      }
      this.appService.loginAPI(body).subscribe((data: any) => {
        
        console.log(data);
        this.appService.cacheUser.set('userInfo', data);
        sessionStorage.setItem('userInfo', JSON.stringify(data));
        sessionStorage.setItem('accounts_id', JSON.stringify(data.accounts_id));
        this.appService.userName.next(data.user_fname +' '+data.user_lname);
        this.appService.notify.next({ id: 'login', value: true });
        if (data.role === 'admin') {
          this.appService.adminPanel.next(true);
        }

        if (data.role === 'customer') {
          this.appService.adminPanel.next(false);
        }
        this.route.navigate(['/home']);
      }, err => {
        this.loading3=false;
        this.isUserInvalid = true;
        // this.loginForm.reset();
      });
    }
    //   let admin = {
    //     "_id": "5dd42958d46b7a6ee4e75697",
    //     "user_fname": "Aguirre",
    //     "user_lname": "Hampton",
    //     "role": "admin",
    //     "accounts_id": "5dd4267ca2c9a04f03489d93",
    //     "mobile_number": "(871) 573-3842",
    //     "email_address": "aguirrehampton@frolix.com",
    //     "secondary_number": "aguirrehampton@frolix.com",
    //     "address": "855 Gunther Place, Lemoyne, Virgin Islands, 6172"
    //   };
    //   if (form.userId === 'admin' && form.password === 'admin') {
    //     this.appService.cacheUser.set('userInfo', admin);
    //     sessionStorage.setItem('userInfo', JSON.stringify(admin));
    //     sessionStorage.setItem('accounts_id', JSON.stringify(admin.accounts_id));
    //     this.appService.notify.next({ id: 'login', value: true });
    //     this.appService.adminPanel.next(true);
    //     this.route.navigate(['/home']);
    //   }

    //   let customer = {
    //     "_id": "5dd42958d46b7a6ee4e7569d",
    //     "user_fname": "Rena",
    //     "user_lname": "Humphrey",
    //     "role": "customer",
    //     "accounts_id": "5dd4267ca2c9a04f03489d93",
    //     "mobile_number": "(870) 439-3330",
    //     "email_address": "renahumphrey@frolix.com",
    //     "secondary_number": "renahumphrey@frolix.com",
    //     "address": "415 Bowne Street, Grill, Tennessee, 6902"
    //   };
    //   if (form.userId === 'customer' && form.password === 'customer') {
    //     this.appService.cacheUser.set('userInfo', customer);
    //     sessionStorage.setItem('userInfo', JSON.stringify(customer));
    //     sessionStorage.setItem('accounts_id', JSON.stringify(customer.accounts_id));
    //     this.appService.notify.next({ id: 'login', value: true });
    //     this.appService.adminPanel.next(false);
    //     this.route.navigate(['/home']);
    //   }
  }
}
