import { NgModule } from '@angular/core';
//Se importa Router.. para tener funcionalidad de enrutamiento
import { RouterModule, Routes } from '@angular/router';
//Da al enrutador un lugar al que ir una vez que se configuren las rutas
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

/*Aquí se configuran las rutas, dicen que vista mostrar cuando un usuario hace clic en un enlace
o pega una URL*/
const routes: Routes = [
  /*Propiedades: path -> cadena que coincide con la URL en la barra de direcciones del navegador
  component: El componente que debe crear el enrutador al navegar a esta ruta
  localhost:4200/heroes*/
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  /*Los : en path, indican que :id es una marcador de posición para un héroe en específico */
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'heroes', component: HeroesComponent },
];

@NgModule({
  /*Método forRoot() configura el enrutador a nivel raíz de la app. Proporciona proveedores de servicios
  y drectivas necesarias para el enrutamiento, y realiza la navegación inicial en función de la URL
  del navegador actual */
  imports: [ RouterModule.forRoot(routes) ],
  //Exporta RouterModule para que esté disponible en toda la app
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
