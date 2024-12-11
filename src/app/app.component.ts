import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProAppConfigService } from '@totvs/protheus-lib-core';
import { EditorComponent } from './Components/editor/editor.component';

import {
  PoMenuItem,
  PoMenuModule,
  PoPageModule,
  PoToolbarModule,
  PoModule,
} from '@po-ui/ng-components';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    PoToolbarModule,
    PoMenuModule,
    PoPageModule,
    HttpClientModule,
    PoModule,
    EditorComponent
],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  constructor(private propAppConfigService: ProAppConfigService){
    if (!this.propAppConfigService.insideProtheus){
      this.propAppConfigService.loadAppConfig()
    }
  }

  readonly menus: Array<PoMenuItem> = [
    { label: 'Home', action: this.onClick.bind(this) },
    { label: 'Tabelas',},
    { label: 'Exit', action: this.closeApp.bind(this) },
  ];

  private onClick() {
    alert('Clicked in menu item');
  }

  private closeApp() {
    if (this.propAppConfigService.insideProtheus()){
      this.propAppConfigService.callAppClose();
    } else {
      alert('O app não está sendo executado dentro do Protheus.')
    }
  }
}
