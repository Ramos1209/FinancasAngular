import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FuncaoService } from 'src/app/services/funcao.service';

@Component({
  selector: 'app-nova-funcao',
  templateUrl: './nova-funcao.component.html',
  styleUrls: ['../listagem-funcao/listagem-funcao.component.css']
})
export class NovaFuncaoComponent implements OnInit {

  erros!: string[];
  formulario: any;


  constructor(
    private route:Router,
    private snackBar: MatSnackBar,
    private _serviceFuncao: FuncaoService) { }

  ngOnInit(): void {
    this.erros = [];
    this.formulario = new FormGroup({
     name : new FormControl(null, [Validators.required, Validators.maxLength(50), Validators.minLength(1),]),
     descricao: new FormControl(null,[Validators.required,Validators.maxLength(50), Validators.minLength(1),])

    });

  }
  get propriedade(){
    return this.formulario.controls;
  }
  EnviarFormulario(): void{
    const funcao = this.formulario.value;
    console.log('1',funcao)
    this.erros = [];
    this._serviceFuncao.NovaFuncao(funcao).subscribe(
      (resultado)=>{
  
        this.route.navigate(['/listagem-funcao/funcao/']);
        this.snackBar.open(resultado.mensagem, '' ,{
          duration: 2000,
          horizontalPosition:'right',
          verticalPosition:'top'
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
  VoltarListagem(): void {
    this.route.navigate(['/funcoes/listagemfuncoes']);
  }

}
