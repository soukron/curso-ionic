import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { PeliculaDetalle, Cast } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  @Input() id;

  pelicula: PeliculaDetalle = {};
  actores: Cast[] = [];
  oculto = 150;

  slideOptActores = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -5
  };

  constructor( private moviesService: MoviesService,
               private modalCtrl: ModalController) { }

  ngOnInit() {
    console.log('id', this.id);
    this.moviesService.getPeliculaDetalle( this.id )
      .subscribe( resp => {
        console.log(resp);
        this.pelicula = resp;
      });

    this.moviesService.getActoresPelicula( this.id )
      .subscribe( resp => {
        console.log(resp);
        this.actores = resp.cast;
      });
  }

  regresar() {
    this.modalCtrl.dismiss();
  }

  favorito() {
    console.log('favorito');
  }
}
