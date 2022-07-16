import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { DadosLogin } from 'src/app/models/DadosLogin';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.css']
})
export class LoginUsuarioComponent implements OnInit {

  formulario:any;
  erros!: string[]; 

  constructor(private _usuarioSerive: UsuariosService,
    private router:Router) { }

  ngOnInit(): void {
    this.erros =[];
    this.formulario = new FormGroup({
      email: new FormControl(null,[Validators.required,Validators.minLength(5), Validators.maxLength(50)]),
      senha: new FormControl(null, [Validators.required,Validators.maxLength(10), Validators.minLength(6)])
    })
  }

  get propriedade(){
   return this.formulario.controls;
  }

  EnviarFormulario():void{
    this.erros =[];
    const login = this.formulario.value;
  

    this._usuarioSerive.LogarUsuario(login).subscribe(resultado=>{
      const emailUsuarioLogado = resultado.emailUsuarioLogado;
      const usuarioId = resultado.usuarioId;
      const token = resultado.tokenUsuarioLogado;
      localStorage.setItem('EmailUsuarioLogado', emailUsuarioLogado);
      localStorage.setItem('usuarioId', usuarioId);
      localStorage.setItem('TokenUser', token);
      console.log(token)
     this.router.navigate(['/list/categias']);
    },
    (err) => {
      if (err.status === 400) {
        for (const campo in err.error.errors) {
          if (err.error.errors.hasOwnProperty(campo)) {
            this.erros.push(err.error.errors[campo]);
          }
        }
      }
      else{
        this.erros.push(err.error);
      }
    });

  };

}
