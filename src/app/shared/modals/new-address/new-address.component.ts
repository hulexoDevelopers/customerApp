import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from './../../services/data.service';

@Component({
  selector: 'app-new-address',
  templateUrl: './new-address.component.html',
  styleUrls: ['./new-address.component.scss'],
})


export class NewAddressComponent implements OnInit {

  street;
  address;
  notes;
  constructor(
    private data: DataService,
    private modalCtrl: ModalController,
  ) {

  }

  ngOnInit() {

  }

  saveAddressDetail() {
    let data = {
      address: this.address,
      street: this.street,
      notes: this.notes

    }
    this.dismiss(true, data)
  }


  dismiss(value: boolean = false, data: any = {}) {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true,
      'isChange': value,
      info: data
    });
  }
}
