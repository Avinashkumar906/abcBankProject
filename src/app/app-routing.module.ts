import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponentComponent } from './component/home-component/home-component.component';
import { LoginComponent } from './component/login/login.component';
import { AdminComponent } from './component/admin/admin.component';
import { RegisterationComponent } from './component/registeration/registeration.component';
import { SurrenderComponent } from './component/surrender/surrender.component';
import { AccountResolver } from './core/services/authGuard';
import { FixedDepositComponent } from './component/fixed-deposit/fixed-deposit.component';
import { SearchComponent } from './component/search/search.component';
import { PageComponent } from './component/page/page.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'fixed-deposit', component: FixedDepositComponent, canActivate: [AccountResolver] },
  { path: 'search', component: SearchComponent, canActivate: [AccountResolver] },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponentComponent, canActivate: [AccountResolver] },
  { path: 'register', component: RegisterationComponent, canActivate: [AccountResolver] },
  { path: 'surrender', component: SurrenderComponent, canActivate: [AccountResolver] },
  { path: 'admin', component: AdminComponent, canActivate: [AccountResolver] },
  { path: 'page', component: PageComponent, canActivate: [AccountResolver] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
