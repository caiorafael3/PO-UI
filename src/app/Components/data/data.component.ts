import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditorService } from '../../services/edit/editor.service';
import { PoModule } from '@po-ui/ng-components';

@Component({
  selector: 'app-exibicao-dados',
  standalone: true,
  imports: [CommonModule, FormsModule, PoModule],
  templateUrl: './data.component.html',
  styleUrl: './data.component.css',
})
export class DataComponent implements OnInit {
  public dados: Array<any> = [];
  public loading: boolean = false;
  public colunas: Array<{ label: string; property: string }> = [];

  constructor(private editorService: EditorService) {}

  ngOnInit(): void {
    // Subscreve-se aos observáveis para obter os dados e o colunas
    this.editorService.dados$.subscribe((dados) => {
      this.dados = dados;
      if (dados.length > 0) {
        this.editorService.setloading(false)
      }
    });

    this.editorService.colunas$.subscribe((colunas) => {
      this.colunas = colunas;
    });

    this.editorService.loading$.subscribe((loading) => {
      this.loading = loading
    })
  }
}
