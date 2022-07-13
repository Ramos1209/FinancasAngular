import { Component, OnInit } from '@angular/core';
import { Tipo } from 'src/app/models/Tipo';
import { TipoService } from 'src/app/services/tipo.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Route, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-nova-categoria',
  templateUrl: './nova-categoria.component.html',
  styleUrls: ['../list-categorias/list-categorias.component.css']
})
export class NovaCategoriaComponent implements OnInit {

  formulario: any;
  tipos: Tipo[] | undefined;
  erros!: string[];

  constructor(private _serviceTipo: TipoService,
    private _serviceCategoria: CategoriaService,
    private snackbar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.erros = [];
    this._serviceTipo.PegarTodos().subscribe(resultado => {
      this.tipos = resultado;
    });

    this.formulario = new FormGroup({
      nome: new FormControl(null,[Validators.required, Validators.maxLength(60)]),
      icone: new FormControl(null,[Validators.required, Validators.maxLength(15)]),
      tipoId: new FormControl(null,[Validators.required])
    });

  }

  get propriedade() {
    return this.formulario.controls;
  }
  EnviarFormulario(): void {
    const categoria = this.formulario.value;
    this.erros = [];
    this._serviceCategoria.NovaCategoria(categoria).subscribe((resul) => {
      this.router.navigate(['list/categias']);
      this.snackbar.open(resul.mensagem, '', {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
    },
      (err) => {
        if (err.status === 400) {
          for (const campo in err.error.errors) {
            if (err.error.errors.hasOwnProperty(campo)) {
              this.erros.push(err.error.errors[campo]);
            }
          }
        }
      });
  }

  Voltar(): void {
    this.router.navigate(['list/categias']);
  }
}
