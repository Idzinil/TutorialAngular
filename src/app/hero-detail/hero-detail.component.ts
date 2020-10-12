import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  //Este componente recibe un objeto héro a través de su propiedad hero y lo muestra
  @Input() hero: Hero;
  constructor() { }

  ngOnInit(): void {
  }

}
