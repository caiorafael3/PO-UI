import { Component, ViewChild, OnInit } from '@angular/core';
import { PoTableColumn, PoTableComponent, PoTableModule } from '@po-ui/ng-components';
import { CamposService } from '../../Services/campos/campos.service';

@Component({
  selector: 'app-lista-campos',
  standalone: true,
  imports: [PoTableModule],
  templateUrl: './lista-campos.component.html',
  styleUrl: './lista-campos.component.css'
})
export class ListaCamposComponent  implements OnInit{
  public colunasCampos!: Array<PoTableColumn>;
  public itensSelecionados: Array<any> = [];
  public itens: Array<any> = [];

  constructor(private camposService : CamposService){}

  ngOnInit(): void {
    this.getColunasCampos();
    this.getColunas();
  }

  getColunasCampos(): void {
    this.colunasCampos = this.camposService.getColunasCampos();
  }

  getColunas(): void {
    this.camposService.getCampos("COLOCAR TABELA DE TESTE").subscribe({
      next: res => (this.itens = res),
      error: err => console.error(err)
    });
  }
}
