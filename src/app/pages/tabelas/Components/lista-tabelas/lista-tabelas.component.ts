import { Component, OnInit} from '@angular/core';
import { PoTableColumn, PoTableModule, PoNotificationService, PoSearchModule} from '@po-ui/ng-components';
import { tabelaService } from '../../Services/tabelas/tabelas.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-tabelas',
  standalone: true,
  imports: [PoTableModule, FormsModule, PoSearchModule],
  templateUrl: './lista-tabelas.component.html',
  styleUrl: './lista-tabelas.component.css',
})
export class ListaTabelasComponent implements OnInit{
  public busca: any = "";
  public textoDigitado: string = "";
  public tabelas: Array<any> = [];
  public colunasTabelas!: Array<PoTableColumn>;

  constructor(private tabelaService: tabelaService, private poNotification : PoNotificationService) {}
 
  public ngOnInit(): void {
    this.getColunasTabelas();
  }

  // Metodo para atualizar a variavel da tabela quando o usuário clicar
  public atualizaTabelaSelecionada(tabelaSelecionada : any) : void {
    const nomeTabela = tabelaSelecionada.tabela;
    this.tabelaService.setTabelaSelecionada(nomeTabela);
  }

  // Metodo para obter o valor informado no input de busca
  public obtemValor(event: string): void {
    this.busca = event;
  }

  // Metodo para trazer as tabelas baseadas no filtro
  public filtrar(): void { 
    if (this.busca && this.busca != this.textoDigitado){
      this.textoDigitado = this.busca;
      this.getTabelas(this.busca);
    }
  }

  // Metodo para buscar as colunas de exibição
  private getColunasTabelas(): void {
    this.colunasTabelas = this.tabelaService.getColunasTabelaService();
  } 

  // Metodo para buscar as tabelas baseadas na busca
  private getTabelas(busca: string): void {
    this.tabelaService.getTabelaService(busca).subscribe({
      next: res => {
        this.tabelas = res.Tabelas;
      },
      error: (error) => {
        return this.poNotification['error'](`Ocorreu um erro ao carregar as tabelas.`);
      }
    });
  }
}
