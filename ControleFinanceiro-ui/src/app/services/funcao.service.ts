import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Funcao } from '../models/Funcao';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'
  }),
}

@Injectable({
  providedIn: 'root'
})
export class FuncaoService {

  url: string = 'api/Funcoes';

  constructor(private http: HttpClient) { }

  PegarTodos(): Observable<Funcao[]>{
    return this.http.get<Funcao[]>(this.url);
  }

  PegarPorId(funcaoId: string):Observable<Funcao>{
    const apiUrl=`${this.url}/${funcaoId}`
    return this.http.get<Funcao>(apiUrl);
  }

  NovaFuncao(funcao: Funcao): Observable<any>{
    console.log('2', funcao)
    return this.http.post<Funcao>(this.url, funcao, httpOptions)
  }

  AtualizarFuncao(funcaoId: string, funcao: Funcao): Observable<any>{
    const apiUrl=`${this.url}/${funcaoId}`
    return this.http.put<Funcao>(apiUrl,funcao,httpOptions);
  }
  ExcluirFuncao(funcaoId: number): Observable<any>{
    const apiUrl=`${this.url}/${funcaoId}`
    return this.http.delete<number>(apiUrl, httpOptions);
  }
  filtrarFuncao(nome: string):Observable<Funcao[]>{
    const apiUrl=`${this.url}/Filtrarfuncao/${nome}`
    return this.http.get<Funcao[]>(apiUrl);
  }
}
