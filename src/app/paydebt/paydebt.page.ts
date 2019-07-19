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
import { Alert, Button } from 'selenium-webdriver';
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
  DetailPayByAccountNo:any;
  mulct:string="0";
  trackfee:string="0";
  closefee:string="0";
  capitalbalance:string="0";
  CUSTOMERCODE:string="";
  realinterest:string="";
  minpayment:string="0";
  showbt:boolean=false
  
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
  this.storage.get('CUSTOMERCODE').then((val) => {
    console.log(val)
    this.CUSTOMERCODE = val
  this.api.GetLoanAccountByPersonId(val,this.Id)
    .subscribe(res => {
      this.DataLoan = res


      console.log(res);
     


    }, err => {
      console.log(err);
      
    });
  });
}


closeModel(){
this.modalController.dismiss()
}




async presentAlertPrompt(AccountNo,MinPayment) {
  this.storage.get('CUSTOMERCODE').then((val) => {
    console.log(val)
  this.api.GetDetailPayByAccountNo(val,AccountNo,"1")
    .subscribe(res => {
      this.DetailPayByAccountNo = res


  for (let i of this.DetailPayByAccountNo){



if(i.Mulct !=""){
  this.mulct = i.Mulct
}
if(i.CloseFee !=""){
  this.closefee = i.CloseFee
}
        
if(i.TrackFee !=""){
  this.trackfee = i.TrackFee
}
if(i.CapitalBalance !=""){
  this.capitalbalance = i.CapitalBalance
}

if(i.RealInterest !=""){
  this.realinterest = i.RealInterest
}
if(i.MinPayment !=""){
  this.minpayment = i.MinPayment
}




this.AlertCF(AccountNo,MinPayment)


//this.openModelPay()

    
  console.log(this.mulct)
  }

      console.log(res);
    
    }, err => {
      console.log(err);
      
    });

  });



}

SaveLoan(){
  this.openModelPay();
  this.closeModel();
}

async openModelPay(){


  const modal = await this.modalController.create({
    component:ModalPage,
    cssClass: 'my-custom-modal-css',
    componentProps:{
      data: this.CUSTOMERCODE,
      data1: this.mulct,
      data2: this.trackfee,
      data3: this.closefee,
      data4: this.capitalbalance,
      data5: this.realinterest,
      data6: this.Payresult,
      data7: this.Acc,
      data8: this.minpayment,
    }
  });
  this.showbt=false
  modal.present();
  
}





async AlertCF(AccountNo,MinPayment){

 


var Minpay =this.minpayment

  const alert = await this.alertController.create({
    header: 'สัญญา :' + AccountNo,
  cssClass: 'alertCF',
    inputs: [

    
      {
        name: 'Pay1',
        type: 'text',
        disabled:true,      
       // value: this.Payresult,
       value: 'ยอดจ่ายขั้นต่ำ '+  Number(Minpay).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') // Number convert stringToint
       
      },
    
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
        cssClass: 'alertButton',
        handler: () => {
          console.log('Confirm Cancel');
        }
      }, {
        text: 'ตกลง',
        cssClass: 'alertButton',
        handler: data => {
          console.log('Confirm Ok');
          console.log(data.Pay);
         this.showbt =true
         this.Payresult =data.Pay.replace(/[^0-9.]/g, "");
         this.Acc = AccountNo
        }
      }
    ]
  });

  await alert.present();
  
}







}
