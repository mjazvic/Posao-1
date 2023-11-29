
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {LoaderService} from "../loader.service";

@Component({
  selector: 'app-language-switcher',
  templateUrl:'language-switcher.component.html' ,
  styleUrls: ['./language-switcher.component.scss'],
})
export class LanguageSwitcherComponent {
  constructor(private translate: TranslateService,private loaderService:LoaderService) {}

  changeLang(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const language = target.value;
    this.translate.use(language);
  }
}
