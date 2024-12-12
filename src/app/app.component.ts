import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ProAppConfigService } from '@totvs/protheus-lib-core';
import { EditorComponent } from './Components/editor/editor.component';
import { TabelaComponent } from './Components/tabela/tabela.component';

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
  constructor(private propAppConfigService: ProAppConfigService, private router: Router){
    if (!this.propAppConfigService.insideProtheus){
      this.propAppConfigService.loadAppConfig()
    }
  }

  menus: Array<PoMenuItem> = [
    { label: 'Home', action: this.onClick.bind(this), icon: 'po-icon-home', shortLabel: 'Home' },
    { label: 'Tabelas', action: this.onTabelas.bind(this), icon: 'ph ph-database', shortLabel: 'Tabelas' },
    { label: 'Minhas consultas', icon: 'ph ph-file-sql', shortLabel: 'Minhas consultas'},
    { label: 'Sair', action: this.closeApp.bind(this), icon:'po-icon-exit', shortLabel: 'sair'},
  ];
  
  private onClick() : void {
    this.router.navigate(['/', 'home']);
  }

  private onTabelas() : void {
    this.router.navigate(['/', 'tabelas']);
  }

  private closeApp() {
    if (this.propAppConfigService.insideProtheus()){
      this.propAppConfigService.callAppClose();
    } else {
      alert('O app não está sendo executado dentro do Protheus.')
    }
  }
}