import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { IonList, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  users: any;
  @ViewChild('lista', {static: false}) lista: IonList;

  constructor(private dataService: DataService,
              private toastCtrl: ToastController) { }

  ngOnInit() {
    this.users = this.dataService.getUsers();
  }

  async presentToast( message: string) {
    const toast = await this.toastCtrl.create({
      color: 'success',
      animated: true,
      message,
      position: 'bottom',
      duration: 2000
    });
    toast.present();
  }

  favorite( user: any ) {
    this.presentToast('Guardado!');
    this.lista.closeSlidingItems();
  }

  share( user: any ) {
    this.presentToast('Compartido!');
    this.lista.closeSlidingItems();
  }

  unread( user: any ) {
    this.presentToast('Borrado!');
    this.lista.closeSlidingItems();
  }
}
