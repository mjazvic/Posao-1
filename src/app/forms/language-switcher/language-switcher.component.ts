
import {Component, Input, OnInit} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {LoaderService} from "../../services/loader.service";

@Component({
  selector: 'app-language-switcher',
  templateUrl:'language-switcher.component.html' ,
  styleUrls: ['./language-switcher.component.scss'],
})
export class LanguageSwitcherComponent implements OnInit{
  @Input() color:string='white';
  langColor:string='black';
  choice:string="black";
  selectedLanguage: string = 'en';
  constructor(private translate: TranslateService) {}
  ngOnInit(): void {if (this.color=="white"){this.choice="white";this.langColor="white"}}

  changeLang(selectedValue: string): void {
    this.translate.use(selectedValue);
  }
}
