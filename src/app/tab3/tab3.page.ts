import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  category:any;
  Statement:any;
  VFName:string="";
  UserId:string="";
  SumAmount :any;
  SumAmountList :any;
  amount:string="00";
  DateToday: string = new Date().toLocaleDateString();
  Time: string = new Date().toLocaleTimeString();
  constructor(private storage: Storage,public api: RestApiService,public loadingController: LoadingController) {

    this.category = "Dashbord"
    this.Statement ="Paydebt"

   
     this.getSumAll();
     this.getSumAllList();
  }
  

  
   getSumAll() {
    this.storage.get('USER_INFO').then((val) => {
      this.UserId = val.UserId // ดึงข้อมูลผู้ใช้งาน
       this.VFName = val.CompName

       this.api.getSumAll(val.UserId )
       .subscribe(res => {   
         this.SumAmount = res;   
         for (let i of this.SumAmount){
           if (i.Amount != ""){
             this.amount = i.Amount
           }    
         }
        
         
         console.log(this.SumAmount)
        
       }, err => {
         console.log('JS Call error: ', err);
      
         alert("ไม่สามารถเชื่อต่อ Server")
   
       });
      });
   
  }

  getSumAllList() {
    this.storage.get('USER_INFO').then((val) => {
      this.UserId = val.UserId // ดึงข้อมูลผู้ใช้งาน
       this.VFName = val.CompName

       this.api.getSumAllList(val.UserId )
       .subscribe(res => {   
         this.SumAmountList = res;   
       
         
         console.log(this.SumAmountList)
        
       }, err => {
         console.log('JS Call error: ', err);
      
         alert("ไม่สามารถเชื่อต่อ Server")
   
       });
      });
   
  }

  refresh() {
 
      this.loadingController.create({
        cssClass: 'transparent',  // css ใส่ไว้ที่ app.scss
        spinner: 'circles',
        duration: 2000
      }).then((res) => {
        res.present();
   
        res.onDidDismiss().then((dis) => {
         this.getSumAll();
         this.getSumAllList();
          this.DateToday = new Date().toLocaleDateString();
          this.Time = new Date().toLocaleTimeString();
        });
      });
    
  
   
}

}
