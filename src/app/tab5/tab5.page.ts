import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {
  SumAmountList :any;
  amount:string="00";
  VFName:string="";
  UserId:string="";
  DateToday: string = new Date().toLocaleDateString();
  Time: string = new Date().toLocaleTimeString();
  constructor(private storage: Storage,public api: RestApiService,public loadingController: LoadingController) { }

  ngOnInit() {
    this.getSumAllList();
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
  ionRefresh(event) {
    console.log('Pull Event Triggered!');
    setTimeout(() => {
      console.log('Async operation has ended');

      this.DateToday = new Date().toLocaleDateString();
      this.Time = new Date().toLocaleTimeString();
      this.getSumAllList();
      //complete()  signify that the refreshing has completed and to close the refresher
      event.target.complete();
    }, 2000);
}
ionPull(event){
  //Emitted while the user is pulling down the content and exposing the refresher.
  console.log('ionPull Event Triggered!');
}
ionStart(event){
  //Emitted when the user begins to start pulling down.
  console.log('ionStart Event Triggered!');
}

 


}
