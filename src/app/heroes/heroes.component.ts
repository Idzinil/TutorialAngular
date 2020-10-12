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

  heroes: HERO[];
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

  getHeroes(): Observable<Hero> {
    //this.heroes = this.heroService.getHeroes();
    return of(HEROES);
  }
}

