import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
/*Clase similar a la de HeroesComponent:
- Define un array
- El constructor espera que se inyecte el HeroService en la propiedad privada heroService
- Se llama al método getHeroes()*/
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  /*El método devuelve la lista de héroes en las posiciones 1 y 5, devolviendo solo cuatro de los héroes:
  2°, 3°, 4° y 5° */
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }
}
