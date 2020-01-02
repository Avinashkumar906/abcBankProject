import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, NgForm } from '@angular/forms';
import { NewsService } from 'src/app/core/services/news.service';
import * as _ from 'lodash';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-new-request',
  templateUrl: './new-reguest.component.html',
  styleUrls: ['./new-reguest.component.scss']
})
export class NewReguestComponent implements OnInit {

  @Input() name: string;
  @Input() requestType: String;
  public request = ['New Request', 'Surrender'];
  public prefferTower = [
    { name: 'Tower 1', value: 'tower_1' },
    { name: 'Tower 2', value: 'tower_2' },
    { name: 'Tower 3', value: 'tower_3' }
  ];
  public employeeBands = ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9', ' E10'];
  regiForm: FormGroup;
  customerId: String = '';
  customerName: String = '';
  // startDate: Date = null;
  // endDate: Date = null;
  accountOwner: any = '';
  branchName: any[] = [];
  balance: any = null;
  userProfile: any = {};
  todayDate: Date = new Date();
  constructor(private fb: FormBuilder, public apiService: NewsService, public dialog: MatDialog, private _snackBar: MatSnackBar) {

  }

  ngOnInit() {

    this.apiService.getBranches().subscribe((data: any[]) => {
      this.branchName = data;
      console.log(this.branchName);
    });
    this.apiService.searchData.subscribe((res: any) => {
      this.customerId = res.customerId;
      this.customerName = res.user_fname + ' ' + res.user_lname;
      this.accountOwner = res.primary_holder;
      this.regiForm = this.fb.group({
        'customerId': [this.customerId, Validators.required],
        'customerName': [this.customerName, Validators.required],
        'accountOwner': [this.accountOwner, Validators.required],
        'branchName': ['', Validators.required],
        'balance': ['', Validators.required],
      });
    })
    this.regiForm = this.fb.group({
      'customerId': [this.customerId, Validators.required],
      'customerName': ['', Validators.required],
      'accountOwner': ['', Validators.required],
      'branchName': ['', Validators.required],
      'balance': ['', Validators.required],
    });
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog1, {
      width: '550px',
      data: ["this"]
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  selectedBranchCode;

  changeClient(value) {
    console.log(value);
    this.selectedBranchCode = this.branchName.filter(data => {
      if (data.branch_address === value) {
        return data.branch_code;
      }
    });
    this.selectedBranchCode = this.selectedBranchCode[0].branch_code;
  }
  onFormSubmit(form: any) {

    console.log(form);

    const date = new Date();
    const currentDate = date.toString();
    let accounts_id = JSON.parse(sessionStorage.getItem('accounts_id'));
    const body = {
      "accounts_id": accounts_id,
      "branch_ID": this.selectedBranchCode,
      "account_type": 'savings',
      "account_balance": form.balance.toString(),
      "account_creation": currentDate,
      "account_charges": '20.22',
      "primary_holder": form.accountOwner
    }
    console.log(body);
    this.apiService.createAccount(body).subscribe((data: any) => {
      console.log(data)
    },
      err => {
        if (err.status == '400') {
          this._snackBar.open('Account already opened', 'Close!', {
            duration: 4000,
          });
        }
      },
      () => {
        this._snackBar.open('Account Created Successfully', 'Done!', {
          duration: 4000,
        });
      });
  }
}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog1 {

  searchMock: any = [
    // { "customerId": "1111", "customerName": "Saurabh" },
    // { "customerId": "1111", "customerName": "Saurabh" },
    // { "customerId": "22", "customerName": "Saurabh malviya" },
    // { "customerId": "223", "customerName": "sinleton" },
    // { "customerId": "11232311", "customerName": "satnam" }
  ]

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog1>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, public apiService: NewsService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  radioChange(data: any) {
    console.log(data);
    this.apiService.searchData.next(data);
    this.dialogRef.close();

  }

  onFormSubmit(form: any) {
    console.log(form);
    this.showResult = true;
  }
  searchForm: FormGroup;
  showResult: boolean = false;
  ngOnInit() {
    this.showResult = false;
    this.searchForm = this.fb.group({
      'search': ['', Validators.required],
      'ctrl': ['1']
    });
  }

  noUser: boolean = false;
  showSearchSpin:boolean=false;
  search(formValue: any) {
    console.log(formValue.search);
    this.showSearchSpin=true;
    this.noUser=false;
    let enteredName = formValue.search;
    this.apiService.search(enteredName).subscribe((data: any[]) => {
      this.searchMock = data.map(ele => {
        return {
          "customerId": ele.accounts_id,
          "user_fname": ele.customerInfo[0].user_fname,
          "user_lname": ele.customerInfo[0].user_lname,
          "primary_holder": ele.primary_holder
        }
      });
    },
      err => {
        console.log(err.status);
        if (err.status == '400') {
          this.noUser = true;
          this.showResult=false;
          this.showSearchSpin=false;
        }
      },

      () => {
        this.noUser = false;
        this.showSearchSpin=false;

      }
    )

  }
}