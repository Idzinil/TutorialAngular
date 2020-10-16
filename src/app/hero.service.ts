import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  /**
  * Se define la URL del formulario Héroe :base/:collectionName con la dirección del recurso de héroes
  * en el servidor.
  * :base es el recurso al que se realizan las solicitudes y
  * :collectionName el objeto de datos de héroes en in-memory-data-service.ts
  */
  private heroesUrl = 'api/heroes';  // URL to web api

  /**
  * La API web de héroes espera un encabezado especial en las solicitudes de guardado HTTP.
  * Ese encabezado está en la httpOptionsconstante definida en HeroService
  **/
   httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  //Se añade el parámetro del servicio de mensaje
  //Se inyecta MessageService en el HeroService que se inyecta en HeroesComponent
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  // Llamará HttpClient.get<Hero[]> que devuelve un Observable<Hero>
  // que emite un solo valor, la matriz de héroes simulados

  /*Get heroes from the server. Se convierte el método para usarlo con el HttpClient*/
  /**
  * Se aprovecha el flujo de valores observables y envia un mensaje, a través del método log()
  * al área de mensajes en la parte inferior de la página. Esto se logra con el op tap() que mira los
  * valores, hace algo y los transmite
  */
  getHeroes(): Observable<Hero[]> {
    //TODO: send el mensaje cuando se busquen los héroes
    //this.messageService.add('HeroService: fetched heroes');
    //return of(HEROES);
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
          catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getHeroNo404<Data>(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.http.get<Hero[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  /**
  * getHero() construye una URL de solicitud con la identif del héroe deseado
  * El servidor debe responder con un solo héroe en lugar de una serie de héroes
  * getHero() devuelve un observable de objetos Hero en lugar de un observable de matrices de hero.
  */
  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  /* GET heroes whose name contains search term */
  /**
  * El método regresa inmediatamente con una matriz vacía si no hay un término de búsqueda.
  * El resto se parece mucho getHeroes(), la única diferencia significativa es la URL,
  * que incluye una cadena de consulta con el término de búsqueda.
  */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found heroes matching "${term}"`) :
         this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
     );
    }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
    /**
     * addHero()se diferencia de updateHero()dos formas:
     * Llama en HttpClient.post()lugar de put().
     * Espera que el servidor genere una identificación para el nuevo héroe, que devuelve Observable<Hero>a la persona que llama.
     */
    addHero(hero: Hero): Observable<Hero> {
      return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
        tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
        catchError(this.handleError<Hero>('addHero'))
      );
    }

    /** DELETE: delete the hero from the server */
    /**
     * Tenga en cuenta los siguientes puntos clave:
     * deleteHero() llamada HttpClient.delete().
     * La URL es la URL del recurso de héroes más EL id del héroe a eliminar.
     * No envía datos como lo hizo con put()y post().
     * Aún envía el httpOptions.
     */
    deleteHero(hero: Hero | number): Observable<Hero> {
      const id = typeof hero === 'number' ? hero : hero.id;
      const url = `${this.heroesUrl}/${id}`;

      return this.http.delete<Hero>(url, this.httpOptions).pipe(
        tap(_ => this.log(`deleted hero id=${id}`)),
        catchError(this.handleError<Hero>('deleteHero'))
      );
    }

    /** PUT: update the hero on the server */
    /*
    * The HttpClient.put() method takes three parameters:
    *   the URL
    *   the data to update (the modified hero in this case)
    *   options
    */
    updateHero(hero: Hero): Observable<any> {
      return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
        tap(_ => this.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError<any>('updateHero'))
      );
    }


    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */

    /**
     * El método HandleError informa del error y luego devuelve un resultado unocuo para que la app siga funcionando
     * En lugar de manejar el error directamente, devuelve una función de manejo de errores a la catchError que ha config
     * con el nombre de la operación que falló y un valor de retorno seguro
     */

    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {

        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead

        // TODO: better job of transforming error for user consumption
        this.log(`${operation} failed: ${error.message}`);

        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }

    /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
