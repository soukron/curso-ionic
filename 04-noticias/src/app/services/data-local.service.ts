import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Article } from 'src/app/interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias: Article[] = [];

  constructor( private storage: Storage,
               public toastCtrl: ToastController ) {
    this.cargarFavoritos();
  }

  async presentaToast( message: string ) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1000,
      color: 'primary',
      position: 'bottom',
      showCloseButton: true
    });

    toast.present();
  }

  guardarNoticia( noticia: Article ) {
    const existe = this.noticias.find( noti => noti.title === noticia.title );

    if ( !existe ) {
      this.noticias.unshift( noticia );
      this.storage.set('favoritos', this.noticias );
    }

    this.presentaToast('Added to Favorites');
  }

  async cargarFavoritos() {
    const favoritos = await this.storage.get( 'favoritos' );

    if ( favoritos ) {
      this.noticias = favoritos;
    }

  }

  borrarNoticia( noticia: Article ) {
    this.noticias = this.noticias.filter( noti => noti.title !== noticia.title );
    this.storage.set('favoritos', this.noticias );

    this.presentaToast( 'Removed from Favorites');
  }

}
