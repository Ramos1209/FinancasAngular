import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categorias } from '../models/Categorias';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

url: string = 'api/Categorias';

  constructor(private http:HttpClient) { }

  PegarTodos(): Observable<Categorias[]>{
    return this.http.get<Categorias[]>(this.url);
  }

  PegarPorId(categoriaId: number):Observable<Categorias>{
    const apiUrl=`${this.url}/${categoriaId}`
    return this.http.get<Categorias>(apiUrl);
  }

  NovaCategoria(categoria: Categorias): Observable<any>{
    return this.http.post<Categorias>(this.url, categoria, httpOptions)
  }

  AtualizarCategoria(categoriaId: number, categoria: Categorias): Observable<any>{
    const apiUrl=`${this.url}/${categoriaId}`
    return this.http.put<Categorias>(apiUrl,categoria,httpOptions);
  }
  ExcluirCategoria(categoriaId: number): Observable<any>{
    const apiUrl=`${this.url}/${categoriaId}`
    return this.http.delete<number>(apiUrl, httpOptions);
  }
  FiltrarCategoria(nome: string): Observable<Categorias[]> {
    const apiUrl=`${this.url}/FiltrarCategoria/${nome}`
    return this.http.get<Categorias[]>(apiUrl);
  }
}
