import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tipo } from '../models/Tipo';

@Injectable({
  providedIn: 'root'
})
export class TipoService {

  constructor(private http:HttpClient) { }

  url: string = 'api/Tipos';


PegarTodos():Observable<Tipo[]>{
  return this.http.get<Tipo[]>(this.url);
}

}
