import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pelicula } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent implements OnInit {

  @Input() peliculas: Pelicula[] = [];
  @Output() cargarMas = new EventEmitter();

  slideOpts = {
    slidesPerView: 2.7,
    freemode: true,
    spaceBetween: -10
  };

  constructor() {}

  ngOnInit() {}

  onClick() {
    console.log('Cargar mas');
    this.cargarMas.emit();
  }
}
