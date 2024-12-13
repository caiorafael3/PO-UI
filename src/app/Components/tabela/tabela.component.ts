import { Component, ViewChild, OnInit } from '@angular/core';
import { PoTableColumn, PoTableComponent, PoTableModule } from '@po-ui/ng-components';
import { tabelaService } from '../../services/tables/tabela.service';
@Component({
  selector: 'app-tabela',
  standalone: true,
  imports: [PoTableModule],
  templateUrl: './tabela.component.html',
  styleUrl: './tabela.component.css'
})
export class TabelaComponent  implements OnInit{
  @ViewChild('POItemsOri', { static: true }) poItemsOri!: PoTableComponent;
  @ViewChild('POItemsSelected', { static: true }) poItemsSelected!: PoTableComponent;

  items: Array<any> = [];
  itemsSelected: Array<any> = [];
  columns!: Array<PoTableColumn>;

  constructor(private service: tabelaService) {}

  ngOnInit(): void {
    this.getColumnsTables();
    this.getColumnsFields();
    // this.getItems();
  }

  getColumnsTables(): Array<PoTableColumn> {
    return [
      { property: 'id', label: 'Tabela', type: 'string', width: '10px'},
      { property: 'nome', label: 'Nome', type: 'string', width: '10px'}
    ];
  }

  getColumnsFields(): Array<PoTableColumn> {
    return [
      { property: 'id', label: 'Campo', type: 'string', width: '10px' },
      { property: 'tipo', label: 'Tipo', type: 'string', width: '10px'},
      { property: 'descricao', label: 'Descrição', type: 'string', width: '10px' }
    ];
  }

  // getItems(): void {
  //   this.service.getItemsTables().subscribe({
  //     next: res => (this.items = res),
  //     error: err => console.error(err)
  //   });
  // }

  changeOptions(event : any, type : any): void {
    if (type === 'new') {
      this.itemsSelected.push({
        id: event.id,
        label: event.label,
        email: event.email
      });
      this.itemsSelected = [...this.itemsSelected];
    } else {
      const index = this.itemsSelected.findIndex(el => el.id === event.id);
      this.poItemsSelected.removeItem(index);
      this.itemsSelected = [...this.poItemsSelected.items];
    }
  }

  deleteItems(items: Array<any>) {
    this.items = items;
    this.itemsSelected = [];
  }
}
