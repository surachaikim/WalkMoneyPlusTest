import { Component, OnInit } from '@angular/core';
import {  Input, Output, EventEmitter } from "@angular/core";
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-addpin',
  templateUrl: './addpin.page.html',
  styleUrls: ['./addpin.page.scss'],
})
export class AddpinPage implements OnInit {
  pin:string= "";
  @Output() change: EventEmitter<string> = new EventEmitter<string>();
  constructor(public alertController: AlertController,public loadingController: LoadingController) { }

  ngOnInit() {
  }

  emitEvent() {
    this.change.emit(this.pin);

   //  this.getLogin()
      
    }
    

  handleInput(pin: string) {
    if (pin === "clear") {
      this.pin = "";
      return;
    }

    if (this.pin.length === 6) {
     
      
      return;
      
    }
    this.pin += pin;
   if ( this.pin.length === 6){

    this.confirm()
    
   }
   
  }

  async confirm(){

      const alert = await this.alertController.create({
        header: 'ยืนยัน',
        message: 'PIN ที่กำหนด : '+ this.pin,
        buttons: [
          {
            text: 'ยกเลิก',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              this.pin ="";
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'ตกลง',
            handler: () => {


              console.log('Confirm Okay');
            }
          }
        ]
      });
  
      await alert.present();
    }
  
  
}
