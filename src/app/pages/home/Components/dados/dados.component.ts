import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DadosService } from '../../Services/dados/dados.service';
import { PoModule } from '@po-ui/ng-components';
import { PoPageDynamicTableModule } from '@po-ui/ng-templates';
import { ConsultaService } from '../../Services/consulta/consulta.service';

@Component({
  selector: 'app-dados',
  standalone: true,
  imports: [CommonModule, FormsModule, PoModule, PoPageDynamicTableModule],
  templateUrl: './dados.component.html',
  styleUrl: './dados.component.css',
})
export class DadosComponent implements OnInit {
  public retornouErro: string = '';
  public carregando: boolean = false;
  public desativarCarregarMais: boolean = false;
  public clicouExecutar: boolean = false;
  public dadosExibidos: any[] = []; 
  public colunas: Array<{ label: string; property: string }> = [];
  private dados: Array<any> = [];
  private posicao: number = 0;

  constructor(private dadosService: DadosService, private consultaService: ConsultaService) {}

  public ngOnInit(): void {
    // Inscreve-se nos observáveis para obter os dados e as colunas
    this.consultaService.clicouExecutar$.subscribe((clicou) => (this.clicouExecutar = clicou))
    this.dadosService.colunas$.subscribe((colunas) => (this.colunas = colunas));
    this.dadosService.carregando$.subscribe((carregando) => (this.carregando = carregando));
    this.dadosService.retornouErro$.subscribe((retornouErro) => (this.retornouErro = retornouErro));
    this.dadosService.dados$.subscribe((dados) => {
      this.dados = dados;
      this.atualizaDados()
    });
  }

  // Metodo que carrega mais dados 
  public carregarMais(): void {
    this.posicao += 20;
    this.consultaService.executarConsulta(this.posicao);
  }

  // Metodo para atualizar a lista de dados exibidos
  private atualizaDados(): void {
    if (!this.dados.length){
      return this.limparDados();
    }

    if (this.clicouExecutar){
      this.dadosExibidos = []
      this.consultaService.setClicouExecutar(false)
    }
    
    this.dadosExibidos = [...this.dadosExibidos, ...this.dados];    
    this.desativarCarregarMais = this.dados.length < 20 ;
  }

  // Metodo para limpar os dados exibidos
  private limparDados(): void {
    this.dadosExibidos = []
    this.colunas = []
  }
}
