import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Funcao } from 'src/app/models/Funcao';
import { FuncaoService } from 'src/app/services/funcao.service';

@Component({
  selector: 'app-atualiza-funcao',
  templateUrl: './atualiza-funcao.component.html',
  styleUrls: ['./atualiza-funcao.component.css']
})
export class AtualizaFuncaoComponent implements OnInit {

  funcaoId!: number;

  nomeFuncao: string | undefined;
  funcao: Observable<Funcao> | undefined
  formulario: any;
  erros!: string[];

  constructor( private router: Router,
    private route: ActivatedRoute,
    private _servicoFuncao: FuncaoService,
   
    private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.erros = [];
    this.funcaoId = this.route.snapshot.params['id'];
  
    this._servicoFuncao.PegarPorId(this.funcaoId.toString()).subscribe(res=>{
      this.nomeFuncao = res.name;
      console.log('id', res.id),
      this.formulario = new FormGroup({
        id : new FormControl(res.id),
        name: new FormControl(res.name),
        descricao: new FormControl(res.descricao)
       
        
      });
    });
  }
  get propriedade() {
    return this.formulario.controls;
  }
  EnviarFormulario(): void {
    this.erros = [];
    const funcao = this.formulario.value;
    console.log('funcao', funcao),
    this._servicoFuncao.AtualizarFuncao(this.funcaoId.toString(), funcao).subscribe(at => {
      {
        this.router.navigate(['listagem-funcao/funcao']);
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
      });
  }
  VoltarListagem(): void {
    this.router.navigate(['listagem-funcao/funcao']);
  }
}
