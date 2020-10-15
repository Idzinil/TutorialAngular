import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  //Este componente recibe un objeto heroé a través de su propiedad hero y lo muestra
  hero: Hero;
  constructor(
    /* Guarda info sobre la ruta a esta instancia del HeroDetailComponent*/
    private route: ActivatedRoute,
    /* Obtiene datos héroe desde el servidor remoto y este componente utiliza para consseguir el héroe a pantalla */
    private heroService: HeroService,
    /* Location es un servicio angular para interactuar con el navegador*/
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  /* route.snapshot es una imgn estática de la info de ruta poco después que el coponente fue creado
  ** paramMap es un diccionario de valores de parámetros de ruta extraídos de la URL, La clave id, devuelve el id del héroe a buscar
  ** Los param de ruta son siempre cadenas, + convierte la cadena en un número, que es lo que id debería ser
  ** El naveg se actualiza y la app se bloquea con un error del compilador
  */
  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }
}
