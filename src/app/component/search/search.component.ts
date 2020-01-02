import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/core/services/news.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

export interface Search {
  value: string;
  viewValue: string;
}



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  showData = true;
  searches: Search[] = [
    { value: 'name', viewValue: 'account name' },
    { value: 'number', viewValue: 'account number' },
    { value: 'client', viewValue: 'client name' }
  ];
  searchForm: FormGroup;
  constructor(private fb: FormBuilder, public apiService: NewsService) { }

  ngOnInit() {

    this.searchForm = this.fb.group({
      // 'searchType': ['', Validators.required],
      'details': ['', Validators.required]
    });
  }

  request;
  searchList: any[] = [];
  nameSearch = '';
  showResult = false;
  showSpinner = false;
  noData = false;
  onFormSubmit(form) {
    console.log(form);
    let searchType = form.searchType;
    let details = form.details;
    this.nameSearch = details;
    this.showSpinner = true;
    this.isError = false;
    this.noData = false;

    // if (searchType == 'name') {
    //   this.request = 'api/search/?name=' + details;
    // }
    // if (searchType == 'number') {
    //   this.request = 'api/search/?account_number=' + details;
    // }
    // if (searchType == 'client') {
    //   this.request = 'api/search/?name=' + details;
    // }
    this.request = 'api/search-engine/?q=' + details;
    this.apiService.searchBy(this.request).subscribe((data: any[]) => {
      console.log(data);
      this.searchList = data.map(data => {
        return {
          "primary_holder": data.primary_holder,
          "account_number": data.account_number,
          "account_type": data.account_type,
          "account_balance": data.account_balance,
          // "address": data.customerInfo[0] && data.customerInfo[0].address,
          "branch_ID": data.branch_ID
        }
      });
      this.showResult = true;
      this.showSpinner = false;
      console.log(this.searchList);
      if (this.searchList.length == 0) {
        this.noData = true;
      }
    },
      err => {
        this.showSpinner = false;
        this.isError = true;
      })

  }
  isError = false;
  reset() {
    this.searchForm.reset();
    this.searchList = [];
    this.showResult = false;
    this.noData=false;
  }
}
