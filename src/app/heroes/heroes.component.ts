import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  //selectedHero: Hero;
  heroes: Hero[];

  //constructor(private heroService: HeroService, private messageService: MessageService) { }
  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  /*hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };*/

  /*onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  }*/

  getHeroes(): void {
    //this.heroes = this.heroService.getHeroes();
    //Un observable emite la serie de héroes.
    //El método subscribe() pasa la matriz emitida a la devolución de llamada que establece la propiedad
    //del componente heroes. Es un enfoque asincróno que funciona cuando el servicio HeroService solicite héroes.
    this.heroService.getHeroes()
      .subscribe(heroes => console.log ('héroes ',this.heroes = heroes));
    //return of(this.heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
}

