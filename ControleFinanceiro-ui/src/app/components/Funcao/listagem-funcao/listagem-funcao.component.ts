import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, Observable, startWith } from 'rxjs';
import { FuncaoService } from 'src/app/services/funcao.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-listagem-funcao',
  templateUrl: './listagem-funcao.component.html',
  styleUrls: ['../listagem-funcao/listagem-funcao.component.css']
})
export class ListagemFuncaoComponent implements OnInit {

  funcao = new MatTableDataSource<any>();
  dysplayedColumns!: string[];
  autoCompleteInput = new FormControl();
  opcoesFuncao: string[] = [];
  nomesFuncao: Observable<string[]> | undefined;


  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private _funcaoService: FuncaoService, private dialog: MatDialog) { }

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
  AbrirDialog(funcaoId: any, nome: any): void {    
    this.dialog
      .open(DialogExclusaoFuncoesComponent, {
        data: {
          funcaoId: funcaoId,
          nome: nome,
        },
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === true) {
          this._funcaoService.PegarTodos().subscribe((dados) => {
            this.funcao.data = dados;
            this.funcao.paginator = this.paginator;
          });
          this.dysplayedColumns = this.ExibirColuna();
        }
      });
  }
}

  @Component({
    selector: 'app-dialog-exclusao-funcoes',
    templateUrl: 'dialog-exclusao-funcoes.html',
  })
  export class DialogExclusaoFuncoesComponent {
    constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
      private funcoesService: FuncaoService,
      private snackBar: MatSnackBar
    ) {}
  
    ExcluirFuncao(funcaoId: any): void {
      this.funcoesService.ExcluirFuncao(funcaoId).subscribe((resultado) => {
        this.snackBar.open(resultado.mensagem, '', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      });
    }
}
