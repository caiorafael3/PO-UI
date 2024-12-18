import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ProAppConfigService } from '@totvs/protheus-lib-core';
import { FormsModule } from '@angular/forms';
import { TemaComponent } from './ComponentTema/tema.component';

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
    FormsModule,
    TemaComponent
],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
  public opcaoTema: boolean = false;

  constructor(private propAppConfigService: ProAppConfigService, private router: Router) {}

  ngOnInit(): void {
    if (!this.propAppConfigService.insideProtheus) {
      this.propAppConfigService.loadAppConfig();
    } 
  }

  menus: Array<PoMenuItem> = [
    { label: 'Home', action: this.onClick.bind(this), icon: 'po-icon-home', shortLabel: 'Home' },
    { label: 'Tabelas', action: this.onTabelas.bind(this), icon: 'ph ph-database', shortLabel: 'Tabelas' },
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
    }
  }
}