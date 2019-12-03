import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  textoBuscar = '';
  sugerencias: Pelicula[] = [];
  peliculas: Pelicula[] = [];
  buscando = false;

  constructor(private moviesService: MoviesService,
              private modalCtrl: ModalController) {
    this.moviesService.getPopulares()
      .subscribe( resp => {
        this.sugerencias = resp.results.slice(0, 5);
      });
  }

  buscar( event ) {
    const titulo: string = event.detail.value;

    if ( titulo === '' ) {
      this.buscando = false;
      this.peliculas = [];
      return;
    }

    this.buscando = true;
    this.moviesService.searchPelicula(titulo)
      .subscribe( resp => {
        this.peliculas = resp.results;
        this.buscando = false;
      });
  }

  async verDetalle( id: string ) {
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });

    modal.present();
  }
}
