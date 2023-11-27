
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-switcher',
  template: `
    <select class="custom-select" (change)="changeLang($event)">
      <option value="en">English</option>
      <option value="hr">Croatian</option>
    </select>
  `,
})
export class LanguageSwitcherComponent {
  constructor(private translate: TranslateService) {}

  changeLang(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const language = target.value;
    this.translate.use(language);
  }
}
