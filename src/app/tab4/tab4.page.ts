import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor(public alertController: AlertController,private storage: Storage,private router: Router) { }

  ngOnInit() {
  }

async  logout(){

 const alert = await this.alertController.create({
        header: 'คุณกำลังจะออก ?',
       /* message: 'Message <strong>text</strong>!!!',*/
        buttons: [
          {
            text: 'ยกเลิก',
            role: 'cancel',
            cssClass: 'alertButton',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'ตกลง',
            handler: () => {
              console.log('Confirm Okay');
                
    this.storage.clear().then(() => {
      this.router.navigateByUrl('loginpin');
     });

            },
          
          }
        ]
      });
  
      await alert.present();
    }


about(){
  this.router.navigate(['about']);
}


  



   
  
}
