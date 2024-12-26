import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { api } from '../../../../Api/api';
import { DadosService } from '../dados/dados.service';
import { AutenticacaoService } from '../../../../services/autenticacao.service';
import { EditorService } from '../editor/editor.service';
import { PoNotificationService } from '@po-ui/ng-components';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  private consulta: string = '';
  private requisicao: {consulta: string, posicao: number} = {consulta: '', posicao: 0}
  private historico: Array<any> = [];
  private clicouExecutarSubject = new BehaviorSubject<boolean>(false);
  public clicouExecutar$ = this.clicouExecutarSubject.asObservable();

  constructor(
    private http: HttpClient, 
    private dadosService: DadosService,
    private editorService: EditorService,
    private autenticacaoService: AutenticacaoService,
    private poNotification: PoNotificationService
  ) {}

  // Metodo para realizar a requisição e trazer o resultado da consulta
  public setConsulta(consulta: {consulta: string, posicao: number}): Observable<any> {
    this.dadosService.setCarregando(true);    
    return this.http.post(`${api.urlConsulta}`, {consulta: consulta.consulta, posicao: consulta.posicao}, {headers: this.autenticacaoService.getAutenticacao()});
  }

  // Metodo para informar que foi clicado no botao executar
  public setClicouExecutar(clicou: boolean): void{
    this.clicouExecutarSubject.next(clicou);
  }

  // Metodo para executar a consulta informada
  public executarConsulta(posicao: number): void { 
    this.editorService.consulta$.subscribe((consulta) => (this.consulta = consulta));   
    if (this.consulta) {  
      this.verificaHistorico(this.consulta)  
      this.requisicao.consulta = this.consulta
      this.requisicao.posicao = posicao
      this.setConsulta(this.requisicao).subscribe({
        next: resposta => this.tratarSucesso(resposta),
        error: error => this.tratarErro(error)
      })
    }
  }

  // Metodo para verificar os itens no historico e adicionar apenas os que não estiverem 
  private verificaHistorico(consulta: string): void {
    let adiciona = true

    this.historico.map(item => {
      if (item.consultas == consulta){
        adiciona = false
      }
    })

    if (adiciona){
      this.historico.push({ "consultas" : consulta});
    }
  }

  // Metodo para tratar com o sucesso ao buscar os dados da consulta
  private tratarSucesso(resposta: any): void {
    const dados = resposta.dados;

    if (dados.length == 0){
      this.dadosService.setDados(dados)
      this.dadosService.setCarregando(false);
      return this.poNotification["information"]("Nenhum dado encontrado.")
    }

    const colunas = Object.keys(dados[0]).map((key) => ({
      label: key,
      property: key
    }))
    this.dadosService.setDados(dados);
    this.dadosService.setColunas(colunas);          
    this.dadosService.setRetornouErro('')
    this.editorService.setHistorico(this.historico);
    this.dadosService.setCarregando(false);
  }

  // Metodo para tratar com o erro ao buscar os dados da consulta
  private tratarErro(error: any): void {
    this.dadosService.setDados([]);
    this.dadosService.setRetornouErro(error.error.errorMessage)
    this.dadosService.setCarregando(false)
    return this.poNotification['error'](`Ocorreu um erro ao exibir resultado da consulta.`);
  }
}
 