import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Categorias } from 'src/app/models/Categorias';
import { Tipo } from 'src/app/models/Tipo';
import { CategoriaService } from 'src/app/services/categoria.service';
import { TipoService } from 'src/app/services/tipo.service';

@Component({
  selector: 'app-atualiza-categoria',
  templateUrl: './atualiza-categoria.component.html',
  styleUrls: ['../list-categorias/list-categorias.component.css']
})
export class AtualizaCategoriaComponent implements OnInit {
  categoriaId!: number;

  nomeCategoria: string | undefined;
  categoria: Observable<Categorias> | undefined
  tipos: Tipo[] | undefined;
  formulario: any;
  erros!: string[];



  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _servicoCategoria: CategoriaService,
    private _servicoTipo: TipoService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.erros = [];
    this.categoriaId = this.route.snapshot.params['id'];

    this._servicoTipo.PegarTodos().subscribe(res => {
      this.tipos = res;
    });

    this._servicoCategoria.PegarPorId(this.categoriaId).subscribe(res => {
      this.nomeCategoria = res.nome;
      this.formulario = new FormGroup({
        categoriaId: new FormControl(res.categoriaId),
        nome: new FormControl(res.nome,[Validators.required, Validators.maxLength(60)]),
        icone: new FormControl(res.icone,[Validators.required, Validators.maxLength(15)]),
        tipoId: new FormControl(res.tipoId,[Validators.required])
      });
    });

  }

  get propriedade() {
    return this.formulario.controls;
  }
  EnviarFormulario(): void {
    this.erros = [];
    const categoria = this.formulario.value;
    this._servicoCategoria.AtualizarCategoria(this.categoriaId, categoria).subscribe(at => {
      {
        this.router.navigate(['list/categias']);
        this.snackbar.open(at.mensagem, '', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      }
    },
      (err) => {
        if (err.status === 400) {
          for (const campo in err.error.errors) {
            if (err.error.errors.hasOwnProperty(campo)) {
              this.erros.push(err.error.errors[campo]);
            }
          }
        }
      })

  }

  Voltar(): void {
    this.router.navigate(['list/categias']);
  }
}
