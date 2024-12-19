import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DadosService } from '../../Services/dados/dados.service';
import { PoModule } from '@po-ui/ng-components';
import { PoPageDynamicTableModule } from '@po-ui/ng-templates';

@Component({
  selector: 'app-dados',
  standalone: true,
  imports: [CommonModule, FormsModule, PoModule, PoPageDynamicTableModule],
  templateUrl: './dados.component.html',
  styleUrl: './dados.component.css',
})
export class DadosComponent implements OnInit {
  public carregando: boolean = false;
  public retornouErro: string = '';
  public dados: Array<any> = [];
  public itens: any[] = []; 
  public qtdPorPagina = 5; 
  public exibeMais = false;
  public colunas: Array<{ label: string; property: string }> = [];

  constructor(private dadosService: DadosService) {}

  public ngOnInit(): void {
    // Inscreve-se nos observáveis para obter os dados e as colunas
    this.dadosService.colunas$.subscribe((colunas) => (this.colunas = colunas));
    this.dadosService.carregando$.subscribe((carregando) => (this.carregando = carregando));
    this.dadosService.retornouErro$.subscribe((retornouErro) => (this.retornouErro = retornouErro));

    this.dadosService.dados$.subscribe((dados) => {
      this.dados = dados;
      if (dados.length > 0) {
        this.carregarMais();
        this.dadosService.setCarregando(false);
      }
    });
  }

  // Metodo que carrega mais dados por pagina
  public carregarMais(): void {
    const inicio = this.itens.length; 
    const fim = inicio + this.qtdPorPagina;

    // Adiciona os próximos dados na lista de itens (paginação)
    this.itens = [...this.itens, ...this.dados.slice(inicio, fim)];

    // Verifica se todos os dados foram carregados, para desabilitar o botao de "Carregar mais"
    this.exibeMais = this.itens.length >= this.dados.length;
  }
}
