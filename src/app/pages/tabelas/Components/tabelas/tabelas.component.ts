import { Component } from '@angular/core';
import { PoTableModule } from '@po-ui/ng-components';
import { ListaCamposComponent } from '../lista-campos/lista-campos.component';
import { ListaTabelasComponent } from '../lista-tabelas/lista-tabelas.component';

@Component({
  selector: 'app-tabela',
  standalone: true,
  imports: [PoTableModule, ListaCamposComponent, ListaTabelasComponent],
  templateUrl: './tabelas.component.html',
  styleUrl: './tabelas.component.css'
})

export class TabelaComponent {} 