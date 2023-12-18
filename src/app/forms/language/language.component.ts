
import {Component, Input, OnInit} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {LoaderService} from "../../services/loader.service";

@Component({
  selector: 'app-language',
  templateUrl:'language.component.html' ,
  styleUrls: ['./language.component.scss'],
})
export class LanguageComponent implements OnInit{
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
