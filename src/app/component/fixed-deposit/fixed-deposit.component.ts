import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewsService } from 'src/app/core/services/news.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-fixed-deposit',
  templateUrl: './fixed-deposit.component.html',
  styleUrls: ['./fixed-deposit.component.scss']
})
export class FixedDepositComponent implements OnInit {
  fdForm: FormGroup;
  loading3=false;

  constructor(private fb: FormBuilder, public apiService: NewsService,private _snackBar: MatSnackBar) { }

  ngOnInit() {
    let accounts_id = JSON.parse(sessionStorage.getItem('accounts_id'));
    this.fdForm = this.fb.group({
      'accountId': [accounts_id, Validators.required],
      'balance': ['', Validators.required],
      'interest': ['', Validators.required],
      'startDate': ['', Validators.required],
      'endDate': ['', Validators.required],
    });
  }

  onFormSubmit(form) {
    this.loading3=true;
    console.log(form);
    this.apiService.createFD(form).subscribe((data) => { 
      this._snackBar.open('fixed deposit created successfully', 'Done!', {
        duration: 4000,
      });
    },
      err => { 
        this.loading3=false;
      },
      () => {
        this.loading3=false;
      })
  }

}
