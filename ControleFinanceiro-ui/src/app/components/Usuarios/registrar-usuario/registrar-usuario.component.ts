import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DadosRegistro } from 'src/app/models/DadosRegistro';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit {

  formulario: any;
  errors!: string[];
  foto!: File;


  constructor(
    private _usuarioService: UsuariosService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.errors = [];
    this.formulario = new FormGroup({
      nomeusuario: new FormControl(null, [Validators.required, Validators.maxLength(50), Validators.minLength(3)]),
      email: new FormControl(null, [Validators.required, Validators.maxLength(50), Validators.minLength(7)]),
      cpf: new FormControl(null, [Validators.required, Validators.maxLength(15), Validators.minLength(11)]),
      foto: new FormControl(null, [Validators.required]),
      profissao: new FormControl(null, [Validators.required, Validators.maxLength(50), Validators.minLength(3)]),
      senha: new FormControl(null, [Validators.required, Validators.maxLength(20), Validators.minLength(3)])

    });
  }

  get propriedade() {
    return this.formulario.controls;
  }

  SelecionarFoto(fileInput: any): void {
    this.foto = fileInput.target.files[0] as File;
    const reader = new FileReader();
    reader.onload = function (e: any) {
      document.getElementById('foto')?.removeAttribute('hidden');
      document.getElementById('foto')?.setAttribute('src', e.target.result);
    };
    reader.readAsDataURL(this.foto);
  }

  EnviarFormulario(): void {
    const usuario = this.formulario.value;
    const formData: FormData = new FormData();

    if (this.foto !== null) {
      formData.append('file', this.foto, this.foto.name);
    }

    this._usuarioService.SalvarFoto(formData).subscribe(resultado => {
      const dadosRegistro: DadosRegistro = new DadosRegistro();
      dadosRegistro.nomeUsuario = usuario.nomeUsuario;
      dadosRegistro.cpf = usuario.cpf;
      dadosRegistro.email = usuario.email;
      dadosRegistro.profissao = usuario.profissao;
      dadosRegistro.foto = resultado.foto;

      this._usuarioService.RegistrarUsuario(dadosRegistro).subscribe(dados => {
        const emailUsuarioLogado = dados.EmailUsuario;
        localStorage.setItem('emailUsuarioLogado', emailUsuarioLogado);
        this.route.navigate(['list/categias']);
      },
        (err) => {
          if (err.status === 400) {
            for (const campo in err.error.errors) {
              if (err.error.errors.hasOwnProperty(campo)) {
                this.errors.push(err.error.errors[campo]);
              }
            }
          }
        }
      );
    });
  }
}
