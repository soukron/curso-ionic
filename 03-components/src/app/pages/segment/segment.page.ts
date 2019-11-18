import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-segment',
  templateUrl: './segment.page.html',
  styleUrls: ['./segment.page.scss'],
})
export class SegmentPage implements OnInit {

  @ViewChild(IonSegment, {static: true}) segment: IonSegment;
  publisher = '';

  superHeroes: Observable<any>;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.segment.value = 'Todos';
    this.superHeroes = this.dataService.getHeroes();
  }

  segmentChanged( event ) {
    const valorSegmento = event.detail.value;

    if ( valorSegmento === 'Todos' ) {
      this.publisher = '';
      return;
    }

    this.publisher = valorSegmento;

    console.log(valorSegmento);
  }

}
