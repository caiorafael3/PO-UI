import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTabelasComponent } from './lista-tabelas.component';

describe('ListaTabelasComponent', () => {
  let component: ListaTabelasComponent;
  let fixture: ComponentFixture<ListaTabelasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaTabelasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaTabelasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
