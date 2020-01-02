import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/core/services/news.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(private appService: NewsService, private router: Router) { }

  route() {
    console.log("route called");
    this.router.navigateByUrl('register');
  }
  routeFd() {
    this.router.navigateByUrl('fixed-deposit');
  }
  routeAd() {
    this.router.navigateByUrl('admin');
  }
  routeSearch(){
    this.router.navigateByUrl('search')
  }
  isLoggedIn: any = false;
  isAdmin: any;
  email;
  userName;
  mobile;
  ngOnInit() {
    this.appService.notify.subscribe((data: any) => {
      if (data.value == true) {
        this.isLoggedIn = true;
        sessionStorage.setItem('login', 'true')
      }
      if (data.value == false) {
        this.isLoggedIn = false;
        sessionStorage.setItem('login', 'false')
      }
    });

    this.appService.adminPanel.subscribe(res => {
      this.isAdmin = res;
      sessionStorage.setItem('isAdmin', res);
    });
    this.isLoggedIn = JSON.parse(sessionStorage.getItem('login'));
    this.isAdmin = JSON.parse(sessionStorage.getItem('isAdmin'));
    console.log(JSON.parse(sessionStorage.getItem('userInfo')));
    if (sessionStorage.getItem('userInfo')) {
      this.userName = JSON.parse(sessionStorage.getItem('userInfo')).user_fname + ' ' + JSON.parse(sessionStorage.getItem('userInfo')).user_lname;
      this.email = JSON.parse(sessionStorage.getItem('userInfo')).email_address;
      this.mobile = JSON.parse(sessionStorage.getItem('userInfo')).mobile_number;
      console.log(this.userName)
    }

  }
  logOut() {
    this.appService.cacheUser.delete('userInfo');

    this.appService.adminPanel.next(false);//sa
    this.appService.notify.next({ id: 'login', value: false });
    sessionStorage.clear();//sa
    this.router.navigate(['/login']);
  }
}
