import { Component, OnInit } from '@angular/core';
import { PoTableColumn, PoTableModule } from '@po-ui/ng-components';
import { CamposService } from '../../Services/campos/campos.service';
import { tabelaService } from '../../Services/tabelas/tabelas.service';
import { PoNotificationService } from '@po-ui/ng-components';

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

  constructor(
    private camposService : CamposService, 
    private tabelaService : tabelaService, 
    private PoNotification : PoNotificationService
  ){}

  public ngOnInit(): void {
    this.tabelaService.nomeTabelaSelecionada$.subscribe((nomeTabelaSelecionada) => {
      (this.nomeTabelaSelecionada = nomeTabelaSelecionada);
      if (this.nomeTabelaSelecionada){
        this.getCamposTabela();
      }
    })
    this.getColunasCampos();
  }

  public getCamposTabela(): void {    
    this.camposService.getCampoService(this.nomeTabelaSelecionada).subscribe({
      next: (res) => {
        (this.campos = res.Campos);
      },
      error: (error) => {
        return this.PoNotification['error']('Ocorreu um erro ao carregar os campos da tabela.');
      }
    });
  }

  private getColunasCampos(): void {
    this.colunasCampos = this.camposService.getColunasCampoService();
  }
}
 