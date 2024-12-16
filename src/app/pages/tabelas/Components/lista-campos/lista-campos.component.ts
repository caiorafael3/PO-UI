import { Component, OnInit } from '@angular/core';
import { PoTableColumn, PoTableModule } from '@po-ui/ng-components';
import { CamposService } from '../../Services/campos/campos.service';
import { tabelaService } from '../../Services/tabelas/tabelas.service';

@Component({
  selector: 'app-lista-campos',
  standalone: true,
  imports: [PoTableModule],
  templateUrl: './lista-campos.component.html',
  styleUrl: './lista-campos.component.css'
})
export class ListaCamposComponent  implements OnInit{
  public colunasCampos!: Array<PoTableColumn>;
  public campos: Array<any> = [];
  public nomeTabelaSelecionada: String = '';

  constructor(private camposService : CamposService, private tabelaService : tabelaService){
    this.tabelaService.nomeTabelaSelecionada$.subscribe((nomeTabelaSelecionada) => {
      (this.nomeTabelaSelecionada = nomeTabelaSelecionada)
      if (this.nomeTabelaSelecionada){
        this.getCamposTabela()
      }
    })
  }

  public ngOnInit(): void {
    this.getColunasCampos();
  }

  private getColunasCampos(): void {
    this.colunasCampos = this.camposService.getColunasCampoService();
  }

  public getCamposTabela(): void {
    this.camposService.getCampoService(this.nomeTabelaSelecionada).subscribe({
      next: (res) => {
        (this.campos = res)
      },
      error: (error) => {
        console.error(`Ocorreu um erro ao carregar os campos da tabela: ${error}`);
      }
    });
  }
}
 