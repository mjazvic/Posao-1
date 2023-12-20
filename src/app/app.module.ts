import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateService } from '@ngx-translate/core';
import { AuthGuard } from './core/guards/auth.guard';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { LanguageComponent } from './core/pipes/language/language.component';
import { LoginGuard} from "./core/guards/login.guard";
import { LoaderComponent } from './core/services/loader/loader.component';
import { TicketComponent } from './pages/tickets/ticket.component';
import { TransactionComponent } from './pages/transactions/transaction.component';
import { Button } from './shared/button/button';
import { MatSelectModule} from "@angular/material/select";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule} from "@angular/material/input";
import { MatButtonModule} from "@angular/material/button";
import { MatTableModule} from "@angular/material/table";
import { MatIconModule} from "@angular/material/icon";
import { MatCardModule} from "@angular/material/card";
import { BetsComponent } from './pages/tickets/bets/bets.component';
import { TicketPopUpComponent } from './pages/tickets/ticketPopUp/ticketPopUp.component';
import { TransactionPopUpComponent } from './pages/transactions/transactionPopUp/transactionPopUp.component';
import { HeaderComponent } from './core/main/header/header.component';
import { MainComponent } from './core/main/main.component';
import { FooterComponent } from './core/main/footer/footer.component';
import { SidebarComponent } from './core/main/sidebar/sidebar.component';
import { NgOptimizedImage } from "@angular/common";
import { TableComponent } from './shared/table/table.component';
import { FormComponent } from './shared/form/form.component';
import { PlayersComponent } from './pages/players/players.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { FormatPipe } from "./core/pipes/numberPipe";
import { DatePipe } from "./core/pipes/datePipe";
import { DynamicFormatPipe } from "./core/pipes/mainPipe";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LanguageComponent,
    LoaderComponent,
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
    FormatPipe,
    DatePipe,
    DynamicFormatPipe,
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
  providers:[AuthGuard,DatePipe,FormatPipe]
  ,
  bootstrap: [AppComponent]
})
export class AppModule { constructor(translate: TranslateService) {
  translate.setDefaultLang('en');}}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
