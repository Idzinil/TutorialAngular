import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { Hero } from '../hero';
import { HeroService} from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];
  selectedHero: Hero;

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  /*hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };*/

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  getHeroes(): void {
    //this.heroes = this.heroService.getHeroes();
    //Un observable emite la serie de héroes.
    //El método subscribe() pasa la matriz emitida a la devolución de llamada que establece la propiedad
    //del componente heroes. Es un enfoque asincróno que funciona cuando el servicio HeroService solicite héroes.
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
    //return of(this.heroes);
  }
}

