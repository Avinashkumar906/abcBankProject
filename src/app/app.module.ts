import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import {MaterialModule} from './material.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { HomeComponentComponent } from './component/home-component/home-component.component';
import { LoginComponent } from './component/login/login.component';
import { LoaderComponent } from './component/loader/loader.component';
import { NewReguestComponent, DialogOverviewExampleDialog1 } from './component/new-reguest/new-reguest.component';
import { AdminComponent } from './component/admin/admin.component';
import { RegisterationComponent } from './component/registeration/registeration.component';
import { SurrenderComponent } from './component/surrender/surrender.component';

import {AccountResolver} from './core/services/authGuard';
import { SeatAvailabilityComponent, DialogOverviewExampleDialog, UpdateUserDialog, TransactionDialog } from './component/seat-availability/seat-availability.component';
import { AcceptComponent } from './component/accept/accept.component';
import { FixedDepositComponent } from './component/fixed-deposit/fixed-deposit.component';
import { SearchComponent } from './component/search/search.component';
import { SidenavComponent } from './component/sidenav/sidenav.component';
import { PageComponent } from './component/page/page.component';
import { MatSortModule, MatTableModule } from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponentComponent,
    LoginComponent,
    LoaderComponent,
    NewReguestComponent,
    AdminComponent,
    RegisterationComponent,
    SurrenderComponent,
    SeatAvailabilityComponent,
    AcceptComponent,
    DialogOverviewExampleDialog,
    DialogOverviewExampleDialog1,
    UpdateUserDialog,
    TransactionDialog,
    FixedDepositComponent,
    SearchComponent,
    SidenavComponent,
    PageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSortModule,
    MatTableModule
  ],
  entryComponents: [
    AcceptComponent,
    DialogOverviewExampleDialog,
    DialogOverviewExampleDialog1,
    UpdateUserDialog,
    TransactionDialog
  ],
  providers: [
    AccountResolver
],
  bootstrap: [AppComponent]
})
export class AppModule { }
