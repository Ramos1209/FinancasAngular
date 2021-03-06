import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtualizaCategoriaComponent } from './components/Categorias/atualiza-categoria/atualiza-categoria.component';
import { ListCategoriasComponent } from './components/Categorias/list-categorias/list-categorias.component';
import { NovaCategoriaComponent } from './components/Categorias/nova-categoria/nova-categoria.component';
import { DashboardComponent } from './components/Dashboard/dashboard/dashboard.component';
import { AtualizaFuncaoComponent } from './components/Funcao/atualiza-funcao/atualiza-funcao.component';
import { ListagemFuncaoComponent } from './components/Funcao/listagem-funcao/listagem-funcao.component';
import { NovaFuncaoComponent } from './components/Funcao/nova-funcao/nova-funcao.component';
import { LoginUsuarioComponent } from './components/Usuarios/Login/login-usuario/login-usuario.component';

import { RegistrarUsuarioComponent } from './components/Usuarios/registrar-usuario/registrar-usuario.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path:'', component:DashboardComponent,
    canActivate:[AuthGuardService],
    children:[
      {
        path: 'list/categias', component:ListCategoriasComponent
      },
      {
        path: 'nova/categias', component:NovaCategoriaComponent
      },
      {
        path: 'categoria/atualizar/:id', component:AtualizaCategoriaComponent
      },
      {
        path: 'listagem-funcao/funcao', component:ListagemFuncaoComponent
      },
      {
        path: 'funcoes/novafuncao', component: NovaFuncaoComponent,
      },
      {
        path: 'funcoes/atualizarfuncao/:id', component:AtualizaFuncaoComponent
      },

    ]
  },

{
  path: 'usuarios/registrarUsuarios', component:RegistrarUsuarioComponent
},
{
  path: 'usuarios/login', component:LoginUsuarioComponent
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
