import { Component, OnInit, ViewChild  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditorService } from '../../Services/editor/editor.service';
import { HistoricoComponent } from './historico/historico.component';
import * as xlsx from 'xlsx'

import {
  PoModule,
  PoModalModule,
  PoModalComponent,
  PoNotificationService
} from '@po-ui/ng-components';
import { ConsultaService } from '../../Services/consulta/consulta.service';
import { DadosService } from '../../Services/dados/dados.service';

@Component({
  selector: 'app-opcoes',
  standalone: true,
  imports: [CommonModule, FormsModule, PoModule, PoModalModule, HistoricoComponent],
  templateUrl: './opcoes.component.html',
  styleUrl: './opcoes.component.css',
})

export class OpcoesComponent implements OnInit{ 
  public titulo: string = ''; 
  private consulta: string = '';
  private dados: Array<any> = [];
  private tipoAcao: 'salvar' | 'exportar' = 'salvar';
  
  @ViewChild('modalDados') modalDados! : PoModalComponent;

  constructor(
    private editorService: EditorService, 
    private poNotification: PoNotificationService,
    private consultaService: ConsultaService,
    private dadoService: DadosService
  ) {}

  public ngOnInit(): void {
    // Se inscreve para observar mudanças dos valores no código e tema
    this.editorService.consulta$.subscribe((consulta) => (this.consulta = consulta));
    this.dadoService.dados$.subscribe((dados) => (this.dados = dados))
  }

  // Metodo para limpar o editor
  public limpar(): void {
    this.editorService.setConsulta(''); 
  }

  // Metodo para executar o consulta SQL do editor
  public executar(): void {
    this.consultaService.setClicouExecutar(true)
    this.consultaService.executarConsulta(0)
  }
  
  // Metodo para verificar o arquivo selecionado
  public selecionarArquivo(event : Event) : void {
    const elemento = event.target as HTMLInputElement;
    if (elemento.files){
      const arquivo = elemento.files[0];
      this.lerArquivo(arquivo);
    }
  }

  // Metodo para verificar qual ação ele irá executar, de salvar ou exportar
  public executarAcaoDados(): void {
    this.tipoAcao === 'salvar' ? this.salvar() : this.exportarDados()
  }

  // Metodo para abrir o modalDados
  public abrirModal(acao: 'salvar' | 'exportar'): void {
    this.tipoAcao = acao
    this.modalDados.open()
  }

  // Metodo para fechar o modalDados
  public fecharModal() {
    this.modalDados.close();
    this.titulo = ''
  }

  // Metodo para ler arquivo selecionado
  private lerArquivo(arquivo : File): void {
    const leitor = new FileReader();
    try {
      leitor.readAsText(arquivo); // Lendo todo o conteudo do arquivo
      // Ao carregar, irá enviar o conteudo lido para o editor
      leitor.onload = (event: any) => {
        this.editorService.setConsulta(event.target.result)
      };
    } catch (error) {
      return this.poNotification['error'](`Ocorreu um erro ao ler o arquivo.`);
    }
  }

  // Metodo para salvar o conteudo da consulta
  private salvar(): void {
    const mensagemAlerta = this.validarDados();

    if (mensagemAlerta) {
      return this.poNotification['information'](mensagemAlerta);
    }

    this.salvarArquivo(this.consulta, this.titulo);
    this.fecharModal()
    return this.poNotification['success']('Arquivo salvo com sucesso.');
  }

  // Metodo para verificar se todas informação necessárias estão preenchidas
  private validarDados(): string | null{
    if (!this.consulta && !this.titulo) {
      return 'Titulo e consulta não informado.';
    }
    if (!this.consulta) {
      return 'Consulta não informada.';
    }
    if (!this.titulo) {
      return 'Titulo não informado.';
    }
    return null;
  }

  // Metodo para realizar o download do arquivo
  private salvarArquivo(consulta: string, titulo: string): void {
    const arquivo = new Blob([consulta], { type: "text/plain" });
    const elementoLink = document.createElement("a");
    const url = URL.createObjectURL(arquivo);
  
    elementoLink.href = url;
    elementoLink.download = `${titulo}.sql`;
    elementoLink.click();
    URL.revokeObjectURL(url);
  }

  // Metodo para exportar o resultado da consulta
  private exportarDados(): void { 
    if(this.dados.length) {
      const titulo = this.titulo ? this.titulo + '.xlsx' : 'dados.xlsx'
      const ws: xlsx.WorkSheet = xlsx.utils.json_to_sheet(this.dados); // Convertendo dados de Json para a planilha
      const wb: xlsx.WorkBook = xlsx.utils.book_new(); // Criando uma area de trabalho
      xlsx.utils.book_append_sheet(wb,ws,'Sheet1'); // Salvando na aba
  
      xlsx.writeFile(wb, titulo); // criando e salvando o arquivo
  
      this.fecharModal()
      return this.poNotification['success']('Dados exportados com sucesso.');
    } 

    return this.poNotification['information']("Não há dados para serem exportados.");
  }
}