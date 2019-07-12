import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { RestApiService } from '../rest-api.service';
import { NavParams } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Screenshot } from '@ionic-native/screenshot/ngx';
import { NavController,ModalController,PopoverController} from '@ionic/angular'
import { CurrencyPipe } from '@angular/common';
import { Base64 } from '@ionic-native/base64/ngx';
import { Storage } from '@ionic/storage';
import { Alert } from 'selenium-webdriver';
import { ReceiptPage } from '../receipt/receipt.page';
import { ModalPage } from '../modal/modal.page';
@Component({
  selector: 'app-paydebt',
  templateUrl: './paydebt.page.html',
  styleUrls: ['./paydebt.page.scss'],
})
export class PaydebtPage implements OnInit {
Id = null;
name= null;
DataLoan:any;
Acc =null;
UserId:string="";
save:any;
Payresult:string ="";
DateToday: string = new Date().toLocaleDateString();
Time: string = new Date().toLocaleTimeString();
VFName:string="";
VFNo:string="";
CompanyInfo:any;
screen: any;
St:string="";
  state: boolean = false;
  UUid :string="1234567890"
  constructor(private storage: Storage,private base64:Base64, private screenshot: Screenshot,private alertController: AlertController,private modalController:ModalController,private navParams:NavParams, public api: RestApiService,private activatedRoute :ActivatedRoute) { 

    this.Id =this.navParams.get('data')
    this.name =this.navParams.get('data1')
    //this.Id =this.activatedRoute.snapshot.paramMap.get('Data')
    
     
       
          this.getLoanbyId();
   
  
        this.storage.get('USER_INFO').then((val) => {
          this.UserId = val.UserId // ดึงข้อมูลผู้ใช้งาน
           this.VFName =val.CompName
          });

    //this.checkregister()
  }

  ngOnInit() {
   
  }

getLoanbyId(){
  this.api.getLoanById(this.Id)
    .subscribe(res => {
      this.DataLoan = res



      console.log(res);
     


    }, err => {
      console.log(err);
      
    });
  
}


closeModel(){
this.modalController.dismiss()
}


async openModel(){
 


  const modal = await this.modalController.create({
    component:ReceiptPage,
    componentProps:{
      data: this.Payresult,
     data1: this.name,
      data2: this.VFName,
     data3: this.Acc
    }
  });
  modal.present();

}

async presentAlertPrompt(AccountNo,TypeLoanName) {
  const alert = await this.alertController.create({
    header: 'สัญญา :' + AccountNo,
    
    inputs: [

 
    
      {
        name: 'Pay',
        type: 'number',
       // value: this.Payresult,
        placeholder: 'ยอดที่ชำระ',
       
      },
    
    ],
    buttons: [
      {
        text: 'ยกเลิก',
        role: 'cancel',
        cssClass: 'primary',
        handler: () => {
          console.log('Confirm Cancel');
        }
      }, {
        text: 'ตกลง',
        handler: data => {
          console.log('Confirm Ok');
          console.log(data.Pay);
         this.Payresult =data.Pay.replace(/[^0-9.]/g, "");
         this.Acc = AccountNo
        }
      }
    ]
  });

  await alert.present();
}



savepaydebt(){
  this.storage.get('USER_INFO').then((val) => {
  this.UserId =val.UserId
  this.VFName = val.CompName
    this.api.InsertloanTrans(this.Acc,this.Payresult,val.UserId,this.name)
    .subscribe(res => {
      this.save = res
      
      for (let i of this.save){
        if(i.St == "1"){
          this.openModel();
         }
      }


      console.log(res);
     


    }, err => {
      console.log(err);
      
    });
  
console.log(this.Acc)
  });


}





checkregister(){

    
  this.api.checkregister(this.UUid)
  .subscribe(res => {
    this.CompanyInfo =res
for (let itm of this.CompanyInfo){
    if (itm.VFName != ""){
      this.VFName =itm.VFName
    }
    if(itm.VFNo != ""){
      this.VFNo =itm.VFNo
    }
}
   

    console.log(this.CompanyInfo);
   


  }, err => {
    console.log(err);
    
  });


}

}
