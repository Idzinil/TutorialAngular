import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor() { }

  //Llamará HttpClient.get<Hero[]> que devuelve un Observable<Hero>
  //que emite un solo valor, la matriz de héroes simulados
  getHeroes(): Observable<Hero[]> {
    return of(HEROES);
  }
}
