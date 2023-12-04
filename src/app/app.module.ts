import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateService } from '@ngx-translate/core';
import { AuthGuard } from './auth.guard';




import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { TicketsComponent } from './tickets/tickets.component';
import { LanguageSwitcherComponent } from './language-switcher/language-switcher.component';
import {LoginGuard} from "./login.guard";
import { LoaderComponent } from './loader/loader.component';
import { LoginFormComponent } from './forms/login-form/login-form.component';
import { TableFormComponent } from './forms/table-form/table-form.component';
import { TransactionTableFormComponent } from './forms/transaction-table-form/transaction-table-form.component';
import { LogoutFormComponent } from './forms/logout-form/logout-form.component';
import { ButtonFormComponent } from './forms/button-form/button-form.component';
import { TableComponent } from './table/table.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    TransactionsComponent,
    TicketsComponent,
    LanguageSwitcherComponent,
    LoaderComponent,
    LoginFormComponent,
    TableFormComponent,
    TransactionTableFormComponent,
    LogoutFormComponent,
    ButtonFormComponent,
    TableComponent,
  ],
  imports: [
    RouterModule.forRoot([
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'transactions/:id', component: TransactionsComponent,canActivate: [AuthGuard] },
      { path: 'tickets/:id', component: TicketsComponent,canActivate: [AuthGuard] },
      { path: '', component: LoginComponent,canActivate: [LoginGuard] },
    ]),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers:[AuthGuard]
  ,
  bootstrap: [AppComponent]
})
export class AppModule { constructor(translate: TranslateService) {
  translate.setDefaultLang('en');}}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
