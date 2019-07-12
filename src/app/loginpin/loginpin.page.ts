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
  public CompanyInfo:any;
  public Pincheck: any;
  CompName:string="";
  CompId:string="";
  
  @Output() change: EventEmitter<string> = new EventEmitter<string>();
  constructor(private statusBar: StatusBar, private storage: Storage,public http: HttpClient,private router: Router,public api: RestApiService, public loadingController: LoadingController) {
    this.statusBar.backgroundColorByHexString('#084880');
 
   }

  ngOnInit() {
   
  }

  ionViewWillEnter(){
    this.pin="";
    this.checkregister();
}


checkregister(){  
  this.api.checkregister(this.Uuid)
  .subscribe(res => {
    this.CompanyInfo =res

    for(let i of this.CompanyInfo){
      if(i.VFName !=""){
        this.CompName = i.VFName
      }
      if(i.VFNo !=""){
        this.CompId =i.VFNo 
      }
    }
  
  
    console.log(res);
  }, err => {
    console.log(err);    
  });

}

  async getLogin() {
    const loading = await this.loadingController.create({
      message: 'กำลังตรวจสอบ...',
      spinner: 'circles'
    });
    
    await loading.present();
    await this.api.getLoginpin(this.pin)
      .subscribe(res => {
        this.Pincheck = res
        console.log(res);
       



  if (this.Pincheck.PassCode === this.pin){
    this.router.navigateByUrl('/tabs/tab2')
    var UserInfo ={
      UserId: this.Pincheck.UserId,
      UserName :this.Pincheck.UserName,
   CompName: this.CompName,
  CompId: this.CompId
    }
    this.storage.set('USER_INFO',UserInfo).then((val) =>{
    //  this.authState.next(true);
console.log(val)

    },
       (err) =>{
        console.log(err)

      });

  }
  else{
    /* console.log('ไม่สามารถเข้าระบบได้');*/
    alert("รหัสผิด" )
    this.pin=""
   }
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
        alert("ไม่สามารถเชื่อมต่อ Server ได้")
        this.pin=""
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
