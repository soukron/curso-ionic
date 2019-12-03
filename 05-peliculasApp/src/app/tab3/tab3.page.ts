import { Component, OnInit } from '@angular/core';
import { DataLocalService } from '../services/data-local.service';
import { PeliculaDetalle, Genre } from '../interfaces/interfaces';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  peliculas: PeliculaDetalle[] = [];
  generos: Genre[] = [];

  constructor( private dataLocal: DataLocalService,
               private moviesService: MoviesService) {}

  async ngOnInit() {
    this.peliculas = await this.dataLocal.cargarPeliculas();
    this.generos = await this.moviesService.getGeneros();
    console.log(this.generos);
  }
}
