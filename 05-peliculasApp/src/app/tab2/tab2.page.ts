import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  textoBuscar = '';
  sugerencias: Pelicula[] = [];
  peliculas: Pelicula[] = [];

  constructor(private moviesService: MoviesService) {
    this.moviesService.getPopulares()
      .subscribe( resp => {
        this.sugerencias = resp.results.slice(0, 5);
      });
  }

  buscar( event ) {
    const titulo = event.detail.value;
    this.moviesService.searchPelicula(titulo)
      .subscribe( resp => {
        console.log(resp);
        this.peliculas = resp.results;
      });
  }
}
