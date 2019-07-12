import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { Storage } from '@ionic/storage';
import {Router} from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  CustomerCode:string="";
  CustomeDetail:any;
  RegisterOld:any;
  Fname:string="";
  Lname:string="";
  Email:string="";
  Mobile:string="";
  AddRegisterRes:any=""

  constructor(private router: Router,public api: RestApiService,private storage: Storage) {

   }

  ngOnInit() {
    this.GetRegister()
  }

  GetRegister(){

    this.storage.get('CUSTOMERCODE').then((val) => {
console.log(val)
      this.api.GetRegister(val)
      .subscribe(res => {
        this.RegisterOld = res
       for (let i of this.RegisterOld){
          if(i.St != "0"){
            this.router.navigateByUrl('confirm')
          }

       }



        console.log(res);
      }, err => {
        console.log(err);
        alert(err)
      });
  
      });

     
        
  }


  onChange(CustomerCode) : void {

    this.api.GetCustomerName(CustomerCode)
    .subscribe(res => {
      this.CustomeDetail = res


      this.storage.set('CUSTOMERCODE',CustomerCode).then((val) =>{
     //เก็บรหัสมาชิกลงเครื่อง
    console.log(val)
    
        },
           (err) =>{
            console.log(err)
    
          });



      console.log(res);
    }, err => {
      console.log(err);
     // alert(err)
    });

    //console.log("Event data: " + CustomerCode);        


  }


AddRegister(){



    this.api.AddRegister(this.CustomerCode,this.Fname,this.Lname,this.Email,this.Mobile)
    .subscribe(res => {
     this.AddRegisterRes = res

     if (this.AddRegisterRes.St != "0"){

      this.router.navigateByUrl('confirm')
      console.log("SS")
     }
     console.log(res)
    }, err => {
        console.log(err);
        alert("ไม่สามารถลงทะเบียนได้")
  
    });

   
}


}
