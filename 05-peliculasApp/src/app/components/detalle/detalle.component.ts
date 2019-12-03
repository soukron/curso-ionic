import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { PeliculaDetalle, Cast } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  @Input() id: any;

  pelicula: PeliculaDetalle = {};
  actores: Cast[] = [];
  oculto = 150;
  existe = false;

  slideOptActores = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -5
  };

  constructor( private moviesService: MoviesService,
               private modalCtrl: ModalController,
               private dataLocal: DataLocalService) { }

  ngOnInit() {
    this.dataLocal.existePelicula( this.id )
      .then( resp => {
        this.existe = resp;
      });

    this.moviesService.getPeliculaDetalle( this.id )
      .subscribe( resp => {
        this.pelicula = resp;
      });

    this.moviesService.getActoresPelicula( this.id )
      .subscribe( resp => {
        this.actores = resp.cast;
      });
  }

  regresar() {
    this.modalCtrl.dismiss();
  }

  async favorito() {
    this.existe = this.dataLocal.guardarPelicula(this.pelicula);
  }
}
