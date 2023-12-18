import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateService } from '@ngx-translate/core';
import { AuthGuard } from './auth.guard';

import { AppComponent } from './app.component';
import { LoginComponent } from './childrens/login/login.component';
import { LanguageSwitcherComponent } from './forms/language-switcher/language-switcher.component';
import { LoginGuard} from "./login.guard";
import { LoaderComponent } from './forms/loader/loader.component';
import { LoginFormComponent } from './childrens/login/login-form/login-form.component';
import { TicketComponent } from './childrens/tickets/ticket.component';
import { TransactionComponent } from './childrens/transactions/transaction.component';
import { Button } from './forms/button/button';
import { MatSelectModule} from "@angular/material/select";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule} from "@angular/material/input";
import { MatButtonModule} from "@angular/material/button";
import { MatTableModule} from "@angular/material/table";
import { MatIconModule} from "@angular/material/icon";
import { MatCardModule} from "@angular/material/card";
import { BetsComponent } from './forms/bets/bets.component';
import { TicketPopUpComponent } from './childrens/tickets/ticketPopUp/ticketPopUp.component';
import { TransactionPopUpComponent } from './childrens/transactions/transactionPopUp/transactionPopUp.component';
import { HeaderComponent } from './main/header/header.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './main/footer/footer.component';
import { SidebarComponent } from './main/sidebar/sidebar.component';
import { NgOptimizedImage } from "@angular/common";
import { TableComponent } from './forms/table/table.component';
import { FormComponent } from './forms/form/form.component';
import { PlayersComponent } from './childrens/players/players.component';
import { ProfileComponent } from './childrens/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LanguageSwitcherComponent,
    LoaderComponent,
    LoginFormComponent,
    TicketComponent,
    TransactionComponent,
    Button,
    BetsComponent,
    TicketPopUpComponent,
    TransactionPopUpComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    SidebarComponent,
    TableComponent,
    FormComponent,
    PlayersComponent,
    ProfileComponent,
  ],
  imports: [
    RouterModule.forRoot([
      {
        path: '', component: MainComponent,canActivate: [AuthGuard], children: [
          {path: 'tickets', component: TicketComponent },
          {path: 'transactions', component: TransactionComponent},
          {path: 'players',component:PlayersComponent},
          {path: 'profile',component:ProfileComponent}
        ],
      },
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
    NgOptimizedImage,
    ReactiveFormsModule
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
