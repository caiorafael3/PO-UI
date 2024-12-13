import { Component, ViewChild, OnInit } from '@angular/core';
import { PoTableComponent, PoTableModule } from '@po-ui/ng-components';
import { tabelaService } from '../../Services/tabelas/tabelas.service';
import { CamposService } from '../../Services/campos/campos.service';
import { ListaCamposComponent } from '../lista-campos/lista-campos.component';
import { ListaTabelasComponent } from '../lista-tabelas/lista-tabelas.component';

@Component({
  selector: 'app-tabela',
  standalone: true,
  imports: [PoTableModule, ListaCamposComponent, ListaTabelasComponent],
  templateUrl: './tabelas.component.html',
  styleUrl: './tabelas.component.css'
})

export class TabelaComponent {
  constructor(private tabelaService: tabelaService, private camposService: CamposService) {}
}