import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { contactModel } from './contact';
import { contactService } from './../../shared/services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  contact = new contactModel()
  constructor(
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private contactService: contactService,
  ) { }

  ngOnInit() {
  }
  isLoading: boolean = false;
  disabled: boolean = false;
  sendEmail() {
    this.isLoading = true;
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Please Wait...' })
      .then(loadingEl => {
        loadingEl.present();

        this.contactService.sendContactEmail(this.contact).subscribe(res => {
          loadingEl.dismiss();
          if (!res.success) {
            this.disabled = false;
            this.responseAlert('Error', '', res.message, false)
          } else {

            this.responseAlert('Success', '', res.message, true)

          }

        })
        setTimeout(() => {
          loadingEl.dismiss(); //auto dismiss after 10s if no response from api
        }, 10000);
      })

  }

  responseAlert(header: string, subHeader: string, message: string, success: boolean) {
    this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: [{
        text: 'OK',
        handler: () => {
          if (success == true) {
            // this.router.navigate(['/login'])
          }
        }
      }]
    }).then(data => {
      data.present()
    });
  }
}
