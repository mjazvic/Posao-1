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
import { LanguageSwitcherComponent } from './language-switcher/language-switcher.component';
import {LoginGuard} from "./login.guard";
import { LoaderComponent } from './loader/loader.component';
import { LoginFormComponent } from './forms/login-form/login-form.component';
import { TableFormComponent } from './forms/table-form/table-form.component';
import { TransactionTableFormComponent } from './forms/transaction-table-form/transaction-table-form.component';
import { LogoutFormComponent } from './forms/logout-form/logout-form.component';
import { ButtonFormComponent } from './forms/button-form/button-form.component';
import { SelectInputComponent } from './forms/select-input/select-input.component';
import {MatSelectModule} from "@angular/material/select";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import { BetsComponent } from './bets/bets.component';
import { PopUpComponent } from './pop-up/pop-up.component';
import { PopUpTransactionComponent } from './pop-up-transaction/pop-up-transaction.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {NgOptimizedImage} from "@angular/common";
import { TableComponent } from './forms/table/table.component';
import { FormComponent } from './form/form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    LanguageSwitcherComponent,
    LoaderComponent,
    LoginFormComponent,
    TableFormComponent,
    TransactionTableFormComponent,
    LogoutFormComponent,
    ButtonFormComponent,
    SelectInputComponent,
    BetsComponent,
    PopUpComponent,
    PopUpTransactionComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    SidebarComponent,
    TableComponent,
    FormComponent,
  ],
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: MainComponent, children: [
                    {path: 'tickets', component: TableFormComponent},
                    {path: 'transactions', component: TransactionTableFormComponent},
                ],
            },
            {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
            {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
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
        }),
        MatSelectModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatButtonModule,
        MatTableModule,
        MatIconModule,
        MatCardModule,
        NgOptimizedImage
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
