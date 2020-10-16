import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: [ './hero-search.component.css' ]
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  /**
   * Cada operador trabaja de la siguiente manera:
   * debounceTime(300)espera hasta que el flujo de nuevos eventos de cadena
   * se detiene durante 300 milisegundos antes de pasar la última cadena.
   * Nunca realizarás solicitudes con una frecuencia superior a 300 ms.
   * distinctUntilChanged() asegura que se envíe una solicitud solo si el texto del filtro cambió.
   * switchMap()llama al servicio de búsqueda para cada término de búsqueda que pasa debounce()
   * y distinctUntilChanged(). Cancela y descarta los observables de búsqueda anteriores,
   * devolviendo solo el último servicio de búsqueda observable.
   */

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }
}
