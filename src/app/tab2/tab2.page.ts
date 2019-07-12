import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from } from 'rxjs';
import { HTTP } from '@ionic-native/http/ngx';
import { Platform, LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { RestApiService } from '../rest-api.service';
import { PaydebtPage } from '../paydebt/paydebt.page';
import { NavController,ModalController,PopoverController} from '@ionic/angular'
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { BarcodeScannerOptions,BarcodeScanner} from "@ionic-native/barcode-scanner/ngx";
import { Device } from '@ionic-native/device/ngx';
import { ViewChild } from '@angular/core';
import {IonRouterOutlet,} from '@ionic/angular';
import {  ViewChildren, QueryList } from '@angular/core';
import { Toast } from '@ionic-native/toast/ngx';
//import { read } from 'fs';
import {Router} from '@angular/router';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
  
})
export class Tab2Page {





  
  data = [];
  Id:string=""
  DataMamber:any;

  CompanyInfo:any;
  idcard: string="";
  firstname:string="";
  lastname:string="";
  personid:string="";
  Opt:string="";
  checkData:"";
  encodeData: any;
  scannedData =null;
  Uuid:string="1234567890";
  VFName:string="";
  UserId:string="";
  title:string="";
  chkPerson:string="";
  public ReceiveUser:string="MdEsjk5d2P"
  public ReceivePassWord:string="Fs8SawmkSJ"
  UUid :string="1234567890"
  state:boolean =false
 
  barcodeScannerOptions: BarcodeScannerOptions;

  @ViewChild(IonRouterOutlet) routerOutlet: IonRouterOutlet;
  
  constructor(private router: Router, private platform: Platform,private device: Device,private storage: Storage,public alertController: AlertController,private barcodeScanner: BarcodeScanner,private modalController:ModalController, private nav : NavController,public api: RestApiService,private http: HttpClient, private nativeHttp: HTTP, private plt: Platform,  public loadingController: LoadingController) {

 //   this.statusBar.overlaysWebView(true);


 


        //OptionsScanner
        this.barcodeScannerOptions = {
          showTorchButton: true,
          showFlipCameraButton: true
        };

  

        this.storage.get('USER_INFO').then((val) => {
          this.UserId = val.UserId // ดึงข้อมูลผู้ใช้งาน
           this.VFName =val.CompName
          });


//alert(this.device.uuid)

     //   this.checkregister();


  }
 



 

  async presentAlert() {
    const alert = await this.alertController.create({
      header: '',
      subHeader: '',
      message: 'ไม่พบสมาชิก',
      buttons: ['OK']
    });

    await alert.present();
  }


  async scanCode() {
    this.barcodeScanner
      .scan()
      .then(barcodeData => {
        //alert("Barcode data " + JSON.stringify(barcodeData));
        this.scannedData = barcodeData.text;
           this.Id =this.scannedData
           if (this.scannedData != null){
            this.getMemberData();
          } else{
           this.presentAlert();
          }
         
        
      })
      
      .catch(err => {
        console.log("Error", err);
      });
  }
 
  async getMemberData() {
    let loading = await this.loadingController.create({
      cssClass: 'transparent',  // css ใส่ไว้ที่ app.scss
      spinner: 'circles',
    });
    await loading.present();
 
    this.api.getMemberById(this.Id)
     
 
    .subscribe(res => {
     
      this.DataMamber = res;
     this.chkPerson=  res.PersonId
      for (let i of this.DataMamber){
        if (i.PersonId != ""){
          this.personid = i.PersonId
          this.state =false
      
          if(i.FirstName != "" && i.LastName != ""){
            this.firstname = i.FirstName
            this.lastname =i.LastName
          }
          loading.dismiss()
          console.log(this.DataMamber)
          return;
        }
      

       
      }
     
      this.DataMamber =[];
      this.state =true
  
      loading.dismiss()
     
    }, err => {
      console.log('JS Call error: ', err);
      loading.dismiss()
      alert("ไม่พบสมาชิก")

    });
  }
 
async openModel(){
  if(this.personid == ""){
    return;
  }
 if(this.personid !="" ){



  const modal = await this.modalController.create({
    component:PaydebtPage,
    componentProps:{
      data: this.personid,
      data1: this.firstname + this.lastname
    }
  });
  modal.present();
}
else{
  alert("ไม่มีรายการชำระ")
}
}


 /* checkregister(){

    
    this.api.checkregister(this.Uuid)
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

  */


 onSearch(event){
 
this.getMemberData()



  }
  
 

 
}
