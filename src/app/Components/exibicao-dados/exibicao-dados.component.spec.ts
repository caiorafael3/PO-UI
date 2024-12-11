import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExibicaoDadosComponent } from './exibicao-dados.component';

describe('ExibicaoDadosComponent', () => {
  let component: ExibicaoDadosComponent;
  let fixture: ComponentFixture<ExibicaoDadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExibicaoDadosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExibicaoDadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
