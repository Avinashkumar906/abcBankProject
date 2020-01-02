import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { NewsService } from 'src/app/core/services/news.service';
import * as _ from 'lodash';
import { API_URLS } from 'src/app/core/constants/api-urls';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, DialogPosition, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatTableDataSource, MatPaginator } from '@angular/material';
import { MatSort } from '@angular/material/sort';




@Component({
  selector: 'app-seat-availability',
  templateUrl: './seat-availability.component.html',
  styleUrls: ['./seat-availability.component.scss']
})
export class SeatAvailabilityComponent implements OnInit {
  dataList = [];
  accontDeatils: any = [];
  transactionDetails;
  fixedDepositDetails;
  totalParking = 0;
  alocatedParking = 0;
  availableParking = 0;
  displayedColumns: any = ['Type', 'Amount', 'Date', 'Charge', 'Transaction Id', 'Status'];
  panelOpenState = false;


  constructor(public apiService: NewsService, public dialog: MatDialog) { }



  showFdSpinner = false;
  ngOnInit() {
    this.transactionDetails = [];
    this.fixedDepositDetails = [];
    this.showFdSpinner = true;

    const path = API_URLS.banking;
    this.apiService.getCustomerDetails(path).subscribe((data: any) => {
      this.dataList = data[0];
      this.accontDeatils = data[0].account[0];
      this.transactionDetails = data[0].transactions;
      this.fixedDepositDetails = data[0].fixedDeposit;
      this.showFdSpinner = false;
      console.log(this.fixedDepositDetails);
    });


  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '100%',
      height: 'auto',
      data: [this.transactionDetails, this.displayedColumns, this.accontDeatils.account_number]
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }
  openUpdateDialog(): void {
    const dialogRef = this.dialog.open(UpdateUserDialog, {
      width: '540px',
      height: 'auto',
      data: [this.dataList]
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  openTransactionDialog(): void {
    let dialogRef = this.dialog.open(TransactionDialog, {
      width: '540px',
      height: 'auto',
      data: [this.accontDeatils]
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: any = ['Type', 'Amount', 'Date', 'Charge', 'Transaction Id', 'Status'];
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data[0])
    this.dataSource = new MatTableDataSource(data[0]);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // sortData(event){
  //   console.log(event);

  //   this.dataSource = this.data[0].sort((a, b) => {
  //     const isAsc = event.direction === 'asc';
  //     switch (event.active) {
  //       case 'Charge': return this.compare(a.name, b.name, isAsc);
  //       // case 'calories': return compare(a.calories, b.calories, isAsc);
  //       // case 'fat': return compare(a.fat, b.fat, isAsc);
  //       // case 'carbs': return compare(a.carbs, b.carbs, isAsc);
  //       // case 'protein': return compare(a.protein, b.protein, isAsc);
  //       default: return 0;
  //     }
  //   });
  //   this.dataSource = new MatTableDataSource();
  // }
  
  // compare(a: number | string, b: number | string, isAsc: boolean) {
  //   return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  // }

}


@Component({
  selector: 'update-user-dialog',
  templateUrl: 'update-user-dialog.html',

})
export class UpdateUserDialog {
  updateForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UpdateUserDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {

    this.updateForm = this.fb.group({
      'name': ['', Validators.required],
      'email': ['', Validators.required],
      'secondary_number': ['', Validators.required],
      'mobile_number': ['', Validators.required],
      'address': ['', Validators.required],
      'mobile_number1': ['', Validators.required],
    });
  }
  onFormSubmit(form) {
    console.log(form);
    //write code for updating the user account
    this.dialogRef.close();
  }

}



@Component({
  selector: 'transaction-dialog',
  templateUrl: 'transaction-dialog.html',
})
export class TransactionDialog {
  loading3 = false;

  constructor(
    public dialogRef: MatDialogRef<TransactionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private apiService: NewsService
    , private _snackBar: MatSnackBar) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  transactForm: FormGroup;
  ngOnInit() {
    let accounts_id = JSON.parse(sessionStorage.getItem('accounts_id'));
    this.transactForm = this.fb.group({
      'accounts_id': [accounts_id, Validators.required],
      'transaction': ['', Validators.required],
      'transaction_amount': ['', Validators.required],
      'transaction_charge': ['', Validators.required],
    });
  }
  onFormSubmit(form) {
    this.loading3=true;
    console.log(form);
    //write code for updating the user account
    this.apiService.postTransaction(form).subscribe((data) => {
      console.log(data);
    },
      err => { this.loading3=false;},
      () => {
        this.loading3=false;
        this._snackBar.open('Transaction Complete', 'Done!', {
          duration: 4000,
        });
        this.dialogRef.close();
      })
  }

}