import { Component, OnInit } from '@angular/core';
import { Device } from '@ionic-native/device/ngx';
import { Storage } from '@ionic/storage';
import {Router} from '@angular/router';
import { RestApiService } from '../rest-api.service';
@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.page.html',
  styleUrls: ['./confirm.page.scss'],
})
export class ConfirmPage implements OnInit {
Ref:string="";
referencecode:string="";
username:string="";
password:string="";
RegisterAt:any;
  constructor(private device: Device,private router: Router,public api: RestApiService,private storage: Storage) {
    this.Ref =this.device.uuid
   }

  ngOnInit() {
  }


  AddActive(){
    
    this.storage.get('CUSTOMERCODE').then((val) => {
      console.log(val)
            this.api.ActiveRegister1(val,this.referencecode,this.username,this.password)
            .subscribe(res => {
              this.RegisterAt = res
             for (let i of this.RegisterAt){
                if(i.St != "0"){
                  this.router.navigateByUrl('addpin')
                }
      
             }
      
      
      
              console.log(res);
            }, err => {
              console.log(err);
              alert(err)
            });
        
            });
      
  }
}
