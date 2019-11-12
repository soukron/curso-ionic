import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { IonList } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  users: any;
  @ViewChild('lista', {static: false}) lista: IonList;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.users = this.dataService.getUsers();
  }

  favorite( user: any ) {
    console.log('favorite', user);
    this.lista.closeSlidingItems();
  }

  share( user: any ) {
    console.log('share', user);
    this.lista.closeSlidingItems();
  }

  unread( user: any ) {
    console.log('borrar', user);
    this.lista.closeSlidingItems();
  }
}
