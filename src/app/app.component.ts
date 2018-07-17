import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private _iconRegistry: MatIconRegistry,
    private _domSanitizer: DomSanitizer) {
      this._iconRegistry.addSvgIconInNamespace('assets', 'person_input',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/person_input.svg'));
      this._iconRegistry.addSvgIconInNamespace('assets', 'pass_input',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/pass_input.svg'));
      this._iconRegistry.addSvgIconInNamespace('assets', 'logo_haceb',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/logo_haceb.svg'));
  }
}

