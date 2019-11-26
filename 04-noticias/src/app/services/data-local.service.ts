import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Article } from 'src/app/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias: Article[] = [];

  constructor(private storage: Storage) { }

  guardarNoticia( noticia: Article ) {
    const existe = this.noticias.find( noti => noti.title === noticia.title );

    if ( !existe ) {
      this.noticias.unshift( noticia );
      this.storage.set('favoritos', this.noticias);
    }
  }

  cargarFavoritos() {

  }
}
