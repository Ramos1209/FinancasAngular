import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TipoService } from './services/tipo.service';
import { CategoriaService } from './services/categoria.service';
import { FuncaoService } from './services/funcao.service';



import { ListCategoriasComponent,DialogExclusaoCategoriasComponent } from './components/Categorias/list-categorias/list-categorias.component';
import { NovaCategoriaComponent } from './components/Categorias/nova-categoria/nova-categoria.component';
import { AtualizaCategoriaComponent } from './components/Categorias/atualiza-categoria/atualiza-categoria.component';

import { ListagemFuncaoComponent ,DialogExclusaoFuncoesComponent} from './components/Funcao/listagem-funcao/listagem-funcao.component';
import { NovaFuncaoComponent } from './components/Funcao/nova-funcao/nova-funcao.component';
import { AtualizaFuncaoComponent } from './components/Funcao/atualiza-funcao/atualiza-funcao.component';

import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { RegistrarUsuarioComponent } from './components/Usuarios/registrar-usuario/registrar-usuario.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxMaskModule, IConfig } from 'ngx-mask'




@NgModule({
  declarations: [
    AppComponent,
    ListCategoriasComponent,
    NovaCategoriaComponent,
    AtualizaCategoriaComponent,
    DialogExclusaoCategoriasComponent,
    DialogExclusaoFuncoesComponent,
    ListagemFuncaoComponent,
    NovaFuncaoComponent,
    AtualizaFuncaoComponent,
    RegistrarUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatSelectModule,
    MatGridListModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatProgressBarModule,
    FormsModule,
    FlexLayoutModule,
    NgxMaskModule.forRoot()
  
  ],
  providers: [
    TipoService,
    CategoriaService,
    FuncaoService,
    HttpClientModule        
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
