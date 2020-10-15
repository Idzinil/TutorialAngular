import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  //Se añade el parámetro del servicio de mensaje
  //Se inyecta MessageService en el HeroService que se inyecta en HeroesComponent
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

    /** Log a HeroService message with the MessageService */
    private log(message: string) {
      this.messageService.add(`HeroService: ${message}`);
    }
    private heroesUrl = 'api/heroes';  // URL to web api
  //Llamará HttpClient.get<Hero[]> que devuelve un Observable<Hero>
  //que emite un solo valor, la matriz de héroes simulados
  getHeroes(): Observable<Hero[]> {
    //TODO: send el mensaje cuando se busquen los héroes
    //this.messageService.add('HeroService: fetched heroes');
    //return of(HEROES);
    return this.http.get<Hero[]>(this.heroesUrl)
  }

  getHero(id: number): Observable<Hero> {
    this.messageService.add(`HeroService: fetched heroe id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }
}
