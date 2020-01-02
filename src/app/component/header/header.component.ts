import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '../../core/services/okta-auth.service';
import { ActivatedRoute } from '@angular/router';
import { API_URLS } from '../../core/constants/api-urls';
import { NewsService } from 'src/app/core/services/news.service';
import * as _ from 'lodash';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AcceptComponent } from '../accept/accept.component';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showDropdown = false;
  category = API_URLS.category;
  value;
  enableNavigation = false;
  constructor(public _OktaAuthService: OktaAuthService, public router: ActivatedRoute,
    public dialog: MatDialog,
    private route: Router,
    public appService: NewsService) { }
  adminPanel: any = true;
  ngOnInit() {

    this.appService.notify.subscribe((response) => {
      if (response.id === 'login') {
        this.enableNavigation = response.value;

      }
    });
    if (this.appService.cacheUser.has('userInfo')) {
      this.enableNavigation = true;
    }

    this.appService.adminPanel.subscribe((res) => {
      this.adminPanel = res;
    });

    this.appService.userName.subscribe(uname => {
      console.log(uname);
      sessionStorage.setItem('userName', uname);
      this.userName = sessionStorage.getItem('userName');
    });

    this.userName = sessionStorage.getItem('userName');
  }
  userName: string;
  toggle() {
    this.showDropdown = !this.showDropdown;
  }
  openDialog(): void {
    this.dialog.open(AcceptComponent,
      {
        width: '400px',
        data: this.appService.cacheUser.get('userInfo')
      }
    );
  }
  logOut() {
    this.appService.cacheUser.delete('userInfo');
    this.enableNavigation = false;//sa
   
    this.appService.adminPanel.next(false);//sa
    this.appService.notify.next({ id: 'login', value: false });
    sessionStorage.clear();//sa
    this.route.navigate(['/login']);
  }
}
