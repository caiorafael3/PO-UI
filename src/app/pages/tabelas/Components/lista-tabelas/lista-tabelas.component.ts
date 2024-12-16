import { Component, OnInit } from '@angular/core';
import { PoTableColumn, PoTableModule, PoNotificationService } from '@po-ui/ng-components';
import { tabelaService } from '../../Services/tabelas/tabelas.service';

@Component({
  selector: 'app-lista-tabelas',
  standalone: true,
  imports: [PoTableModule],
  templateUrl: './lista-tabelas.component.html',
  styleUrl: './lista-tabelas.component.css',
})
export class ListaTabelasComponent implements OnInit{
  public tabelas: Array<any> = [];
  public colunasTabelas!: Array<PoTableColumn>

  constructor(private tabelaService: tabelaService, private poNotification : PoNotificationService) {}

  public ngOnInit(): void {
    this.getColunasTabelas();
    this.getTabelas();
  }

  private getColunasTabelas(): void {
    this.colunasTabelas = this.tabelaService.getColunasTabelaService();
  } 

  private getTabelas(): void {
    this.tabelaService.getTabelaService().subscribe({
      next: res => {
        (this.tabelas = res)
      },
      error: (error) => {
        this.poNotification['error'](`Ocorreu um erro ao carregar as tabelas.`);
        console.error(`Ocorreu um erro ao carregar as tabelas: ${error}`);
      }
    });
  }

  public atualizaTabelaSelecionada(tabelaSelecionada : any) : void {
    const nomeTabela = tabelaSelecionada.tabela
    this.tabelaService.setTabelaSelecionadaSubject(nomeTabela)    
  }
}
