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

  public atualizaTabelaSelecionada(tabelaSelecionada : any) : void {
    const nomeTabela = tabelaSelecionada.tabela;
    this.tabelaService.setTabelaSelecionada(nomeTabela);
  }

  public obtemValor(event: string): void {
    this.busca = event;
  }

  public filtrar(): void { 
    if (this.busca && this.busca != this.textoDigitado){
      this.textoDigitado = this.busca;
      this.getTabelas();
    }
  }

  private getColunasTabelas(): void {
    this.colunasTabelas = this.tabelaService.getColunasTabelaService();
  } 

  private getTabelas(): void {
    this.tabelaService.getTabelaService(this.busca).subscribe({
      next: res => {
        this.tabelas = res.Tabelas;
      },
      error: (error) => {
        return this.poNotification['error'](`Ocorreu um erro ao carregar as tabelas.`);
      }
    });
  }
}
