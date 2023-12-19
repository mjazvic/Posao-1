import {Component, OnInit} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language',
  templateUrl:'language.component.html' ,
  styleUrls: ['./language.component.scss'],
})
export class LanguageComponent implements OnInit{
  public selectedLanguage: string = 'en';
  public croImg:string='/assets/branding/lang-cro.png';
  public engImg:string='/assets/branding/lang-eng.png';
  constructor(private translate: TranslateService) {}
  ngOnInit(): void {}

  public changeLang(selectedValue: string): void {
    this.translate.use(selectedValue);
  }
}
