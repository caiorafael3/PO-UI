import { Component, ViewChild, OnInit } from '@angular/core';
import { PoTableColumn, PoTableComponent, PoTableModule } from '@po-ui/ng-components';
import { tabelaService } from '../../Services/tabelas/tabelas.service';

@Component({
  selector: 'app-lista-tabelas',
  standalone: true,
  imports: [PoTableModule],
  templateUrl: './lista-tabelas.component.html',
  styleUrl: './lista-tabelas.component.css'
})
export class ListaTabelasComponent implements OnInit{
  public itens: Array<any> = [];
  public itensSelecionados: Array<any> = [];
  public colunasTabelas!: Array<PoTableColumn>
   
  @ViewChild('POItensOrigem', { static: true }) poItensOrigem!: PoTableComponent;
  @ViewChild('POItensSelecionados', { static: true }) poItensSelecionados!: PoTableComponent;

  constructor(private tabelaService: tabelaService) {}

  ngOnInit(): void {
    this.getColunasTabelas();
    this.getTabelas();
  }

  getColunasTabelas(): void {
    this.colunasTabelas = this.tabelaService.getColunasTabelas();
  }

  getTabelas(): void {
    this.tabelaService.getTabelas().subscribe({
      next: res => (this.itens = res),
      error: err => console.error(err)
    });
  }

  mudarOpcoes(event: any, tipo: any): void {
    if (tipo === 'new') {
      this.itensSelecionados.push({
        id: event.id,
        label: event.label,
        email: event.email
      });
      this.itensSelecionados = [...this.itensSelecionados];
    } else {
      const index = this.itensSelecionados.findIndex(elemento => elemento.id === event.id);
      this.poItensSelecionados.removeItem(index);
      this.itensSelecionados = [...this.poItensSelecionados.items];
    }
  }

  deletarItens(items: Array<any>) {
    this.itens = items;
    this.itensSelecionados = [];
  }
}
