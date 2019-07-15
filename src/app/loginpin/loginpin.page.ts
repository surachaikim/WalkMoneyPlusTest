import { Component, OnInit } from '@angular/core';
import {  Input, Output, EventEmitter } from "@angular/core";
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { componentFactoryName } from '@angular/compiler';
import { StatusBar } from '@ionic-native/status-bar/ngx';
@Component({
  selector: 'app-loginpin',
  templateUrl: './loginpin.page.html',
  styleUrls: ['./loginpin.page.scss'],
})
export class LoginpinPage implements OnInit {
  pin:string= "";
  Uuid:string ="1234567890"
  authState = new BehaviorSubject(false);
  public CustomerName:any;
  public Pincheck: any;
  CompName:string="";
  CompId:string="";
  CustomerCode:string="";
  @Output() change: EventEmitter<string> = new EventEmitter<string>();
  constructor(private statusBar: StatusBar, private storage: Storage,public http: HttpClient,private router: Router,public api: RestApiService, public loadingController: LoadingController) {
    this.statusBar.backgroundColorByHexString('#084880');
 
   }

  ngOnInit() {
   
  }

  ionViewWillEnter(){
    this.pin="";
   // this.checkregister();
}




  async getLogin() {
    const loading = await this.loadingController.create({
      message: 'กำลังตรวจสอบ...',
      spinner: 'circles'
    });
    
    loading.present();
    this.storage.get('CUSTOMERCODE').then((val) => {
    
     this.api.GetLoginpin(val,this.pin)
      .subscribe(res => {
        this.Pincheck = res
       // console.log(res);
      
for (let i of this.Pincheck){

  
  if (i.PassCode == this.pin && i.FlagActive == true){

    this.api.GetCustomerName(val)
      .subscribe(res => {
        this.CustomerName = res

        for (let itm of this.CustomerName){
          if(itm.CustomerName != ""){
            this.CompName = itm.CustomerName
            this.CustomerCode =itm.CustomerCode
          }
        }
        var UserInfo ={
          // set ค่าข้อมูลผู้เข้าใช้      
          UserId: i.UserId,        
          CompName: this.CompName,
          CustomerCode: this.CustomerCode 
        }

        this.storage.set('USER_INFO',UserInfo).then((val) =>{
        // เก็บลงเครื่อง
          this.router.navigateByUrl('/tabs/tab2')
        console.log(val)
    
    
          });
      });



  }
  else{
    /* console.log('ไม่สามารถเข้าระบบได้');*/
    alert("รหัสผิด" )
    this.pin=""
   }

}
 
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
        alert("ไม่สามารถเชื่อมต่อ Server ได้")
        this.pin=""
      });

    });
  }

  emitEvent() {
    this.change.emit(this.pin);

     this.getLogin()
       
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

    this.getLogin();
   }
   
  }


}
