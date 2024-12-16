import { TestBed } from '@angular/core/testing';
import { tabelaService } from './tabelas.service';

describe('TabelaService', () => {
  let service: tabelaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(tabelaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
