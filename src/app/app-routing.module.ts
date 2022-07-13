import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtualizaCategoriaComponent } from './components/Categorias/atualiza-categoria/atualiza-categoria.component';
import { ListCategoriasComponent } from './components/Categorias/list-categorias/list-categorias.component';
import { NovaCategoriaComponent } from './components/Categorias/nova-categoria/nova-categoria.component';
import { ListagemFuncaoComponent } from './components/Funcao/listagem-funcao/listagem-funcao.component';
import { NovaFuncaoComponent } from './components/Funcao/nova-funcao/nova-funcao.component';

const routes: Routes = [
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

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
