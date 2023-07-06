import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { environment } from 'src/environments/environment';
import { Characters } from '../interfaces/characters.interfaces';
import { Observable, catchError, take } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(
    private http: HttpClient
  ) { }
  //busca los personajes
  searchCharacters(query = '', page = 400):Observable<Characters[]> {
    const filter = `${environment.baseUrlApi}/?name=${query}&page=${page}`;
    return this.http.get<Characters[]>(filter)
    //.pipe(catchError((err) => this.handleHttpError(err)));
  }
  //trae los detalles de los personajes
  getDetails(id: number) {
    return this.http.get<Characters>(`${environment.baseUrlApi}/${id}`)
  }
}
