import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { PeliculaDetalle } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  peliculas: PeliculaDetalle[] = [];

  constructor( private storage: Storage,
               private totastCtrl: ToastController ) {
    this.cargarPeliculas();
  }

  async presentToast( message: string ) {
    const toast = await this.totastCtrl.create({
      message,
      duration: 1000,
      color: 'primary',
      position: 'bottom'
    });
    toast.present();
  }

  guardarPelicula( pelicula: PeliculaDetalle ) {

    let existe = false;
    let mensaje = '';

    for ( const peli of this.peliculas ) {
      if ( peli.id === pelicula.id ) {
        existe = true;
        break;
      }
    }

    if ( existe ) {
      this.peliculas = this.peliculas.filter ( peli => peli.id !== pelicula.id );
      mensaje = 'Eliminada de favoritos';
    } else {
      this.peliculas.push( pelicula );
      mensaje = 'Guardada en favoritos';
    }

    this.presentToast(mensaje);
    this.storage.set('peliculas', this.peliculas);

    return !existe;
  }

  async cargarPeliculas() {
    const peliculas = await this.storage.get('peliculas');

    this.peliculas = peliculas || [];
    return this.peliculas;
  }

  async existePelicula( id ) {
    await this.cargarPeliculas();
    const existe = this.peliculas.find( peli => peli.id === id );

    return (existe) ? true : false;
  }
}
