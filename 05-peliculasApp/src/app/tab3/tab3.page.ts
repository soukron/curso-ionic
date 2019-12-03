import { Component, OnInit } from '@angular/core';
import { DataLocalService } from '../services/data-local.service';
import { PeliculaDetalle, Genre } from '../interfaces/interfaces';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  peliculas: PeliculaDetalle[] = [];
  generos: Genre[] = [];
  peliculasPorGenero: any[] = [];

  constructor( private dataLocal: DataLocalService,
               private moviesService: MoviesService) {}

  async ionViewWillEnter() {
    this.peliculas = await this.dataLocal.cargarPeliculas();
    this.generos = await this.moviesService.getGeneros();

    this.agrupaPeliculasPorGenero(this.peliculas, this.generos);
  }

  agrupaPeliculasPorGenero( peliculas: PeliculaDetalle[], generos: Genre[] ) {
    this.peliculasPorGenero = [];

    generos.forEach( genero => {
      this.peliculasPorGenero.push({
        name: genero.name,
        peliculas: peliculas.filter( pelicula => {
          return pelicula.genres.find( genre => genre.id === genero.id );
        })
      });
    });
    console.log(this.peliculasPorGenero);
  }
}
