import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { FuncaoService } from 'src/app/services/funcao.service';

@Component({
  selector: 'app-listagem-funcao',
  templateUrl: './listagem-funcao.component.html',
  styleUrls: ['./listagem-funcao.component.css']
})
export class ListagemFuncaoComponent implements OnInit {

  funcao = new MatTableDataSource<any>();
  dysplayedColumns!: string[];
  autoCompleteInput = new FormControl();
  opcoesFuncao: string[] = [];
  nomesFuncao: Observable<string[]> | undefined;


  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private _funcaoService: FuncaoService) { }

  ngOnInit(): void {
    this._funcaoService.PegarTodos().subscribe((resultado) => {
    resultado.forEach((funcao)=>{
      this.opcoesFuncao.push(funcao.name)
    });
    this.funcao.data = resultado;
    this.funcao.sort = this.sort;
    this.funcao.paginator = this.paginator;
  });

    this.dysplayedColumns = this.ExibirColuna();

    this.nomesFuncao = this.autoCompleteInput.valueChanges.pipe(
      startWith(''),
      map((nome) => this.FiltrarNomes(nome))
    );
  }
  FiltrarNomes(nome: string): any {
    if (nome.trim().length >= 4) {
      this._funcaoService
        .filtrarFuncao(nome.toLowerCase())
        .subscribe((resultado) => {
          this.funcao.data = resultado;
        });
    } else {
      if (nome === '') {
        this._funcaoService.PegarTodos().subscribe((resultado) => {
          this.funcao.data = resultado;
        });
      }
  }
  return this.opcoesFuncao.filter((funcao) =>
  funcao.toLowerCase().includes(nome.toLowerCase())
);
}

  ExibirColuna(): string[] {
    return ['name', 'descricao', 'acoes'];
  }

}
