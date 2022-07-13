import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemFuncaoComponent } from './listagem-funcao.component';

describe('ListagemFuncaoComponent', () => {
  let component: ListagemFuncaoComponent;
  let fixture: ComponentFixture<ListagemFuncaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListagemFuncaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListagemFuncaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
