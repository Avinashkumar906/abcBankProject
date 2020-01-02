import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/core/services/news.service';
import * as _ from 'lodash';
import { API_URLS } from 'src/app/core/constants/api-urls';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  dataList: any = [];
  adminDetails: any = [];
  constructor(public apiService: NewsService, private router: Router) { }

  ngOnInit() {
    this.getRequest();
    const path = API_URLS.banking;
    this.apiService.getCustomerDetails(path).subscribe((data: any) => {
      console.log(data);
      this.adminDetails = data[0];
    });

  }

  openNewAcc() {
    this.router.navigateByUrl('register');
  }
  openNewFD(){
    this.router.navigateByUrl('fixed-deposit');
  }

  openSearch(){
    this.router.navigateByUrl('search');

  }
  getRequest() {
    this.apiService.getAllTransactions().subscribe((data: any) => {
      this.dataList = data;
      console.log(this.dataList);
    });
  }
  approve(item) {
    const path = 'api/raise-request';
    this.apiService.putHttpRequest(path, item).subscribe((data: any) => {
      this.getRequest();
    });
  }
  reject(item) {
    const path = 'api/raise-request/' + item._id;
    this.apiService.deleteHttpRequest(path).subscribe((data: any) => {
      this.getRequest();
    });
  }
}
