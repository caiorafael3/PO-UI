import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PoModalModule, PoListViewModule } from '@po-ui/ng-components';
import { EditorService } from '../../../Services/editor/editor.service';

@Component({
  selector: 'app-historico',
  standalone: true,
  imports: [CommonModule, FormsModule, PoModalModule, PoListViewModule],
  templateUrl: './historico.component.html',
  styleUrl: './historico.component.css'
})
export class HistoricoComponent implements OnInit{
  public historico: Array<any> = []

  constructor(private editorService: EditorService){}

  public ngOnInit(): void {
    this.editorService.historico$.subscribe((historico) => {
      this.historico = historico;
    })
  }
}
 