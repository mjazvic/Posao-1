import {Component, OnInit} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {LogOutService} from "./log-out.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {

  constructor(private translate:TranslateService,private logOutService: LogOutService) { }


  public ngOnInit(): void { }

  changeLanguage(language: string): void {
    this.translate.use(language);
  }

}
