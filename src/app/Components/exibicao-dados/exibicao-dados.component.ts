import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditorService } from '../../services/editor/editor.service';
import { PoModule } from '@po-ui/ng-components';

@Component({
  selector: 'app-exibicao-dados',
  standalone: true,
  imports: [CommonModule, FormsModule, PoModule],
  templateUrl: './exibicao-dados.component.html',
  styleUrl: './exibicao-dados.component.css',
})
export class ExibicaoDadosComponent implements OnInit {
  public dados: Array<any> = [];
  public resultado: Array<{ label: string; property: string }> = [];

  constructor(private editorService: EditorService) {}

  ngOnInit(): void {
    // Subscreve-se aos observáveis para obter os dados e o resultado
    this.editorService.dados$.subscribe((dados) => {
      this.dados = dados;
    });

    this.editorService.resultado$.subscribe((resultado) => {
      this.resultado = resultado;
    });
  }
}
