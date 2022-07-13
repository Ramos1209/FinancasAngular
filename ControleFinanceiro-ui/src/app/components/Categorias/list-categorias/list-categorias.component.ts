import {  Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

import {MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { map, Observable, startWith } from 'rxjs';
import { CategoriaService } from '../../../services/categoria.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-list-categorias',
  templateUrl: './list-categorias.component.html',
  styleUrls: ['./list-categorias.component.css']
})


export class ListCategoriasComponent implements OnInit {

  categorias = new MatTableDataSource<any>();
  dysplayedColumns!: string[];
  autoCompleteInput=  new FormControl();
  opcoesCategoria: string[] =[];
  nomesCategoria: Observable<string[]> | undefined;

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true })
  sort!: MatSort;

  constructor(private _service: CategoriaService,private dialog:MatDialog) { }


  ngOnInit(): void {
    this._service.PegarTodos().subscribe(resultado =>{
      resultado.forEach(el=>{
        this.opcoesCategoria.push(el.nome);
      });

      this.categorias.data = resultado;
       this.categorias.paginator = this.paginator;
       this.categorias.sort = this.sort;
    });

    this.dysplayedColumns = this.ExibirColuna();

    this.nomesCategoria = this.autoCompleteInput.valueChanges.pipe(startWith(''),
       map((nome)=>this.FiltrarNomes(nome))
    )
  }

   ExibirColuna(): string[]{
    return ['nome','icone','tipo','acoes']
   }

  AbrirDialog(categoriaId: any, nome: any): void {
    this.dialog.open(DialogExclusaoCategoriasComponent, {
      data: {
        categoriaId: categoriaId,
        nome: nome
      }
    }).afterClosed().subscribe(resultado => {
      if (resultado === true) {
        this._service.PegarTodos().subscribe(dados => {
          this.categorias.data = dados;
        });
        this.dysplayedColumns = this.ExibirColuna();
      }
    });
  }


  FiltrarNomes(nome: string): string[]{
    if(nome.trim().length >= 4){
      this._service.FiltrarCategoria(nome.toLowerCase()).subscribe(resultado =>{
        this.categorias.data = resultado;
      });
    }
    else{
      if(nome === ''){
        this._service.PegarTodos().subscribe(resultado=>{
          this.categorias.data = resultado;
        });
      }
    }
    return this.opcoesCategoria.filter((categ)=>
      categ.toLocaleLowerCase().includes(nome.toLocaleLowerCase())
    );
  
  }

}

@Component({
  selector:'app-dialog-exclusao-categorias',
  templateUrl:'dialog-exclusao-categorias.html'
})

export class DialogExclusaoCategoriasComponent{
  constructor(@Inject (MAT_DIALOG_DATA) public dados:any,
   private _service: CategoriaService, private snackbar: MatSnackBar ){}

   ExcluirCategoria(categoriaId: number): void{
    this._service.ExcluirCategoria(categoriaId).subscribe((resultado)=>{
    this.snackbar.open(resultado.mensagem, '', {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
    });
   }
}
