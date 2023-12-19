
import {Component, Input, OnInit} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language',
  templateUrl:'language.component.html' ,
  styleUrls: ['./language.component.scss'],
})
export class LanguageComponent implements OnInit{
  @Input() color:string='white';
  public langColor:string='black';
  public choice:string="black";
  public selectedLanguage: string = 'en';
  constructor(private translate: TranslateService) {}
  ngOnInit(): void {if (this.color=="white"){this.choice="white";this.langColor="white"}}

  public changeLang(selectedValue: string): void {
    this.translate.use(selectedValue);
  }
}
