import { Component, OnInit } from '@angular/core';
import { Base64 } from '@ionic-native/base64/ngx';
import { Storage } from '@ionic/storage';
import { Screenshot } from '@ionic-native/screenshot/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { NavParams } from '@ionic/angular';
import { NavController,ModalController,PopoverController} from '@ionic/angular'
@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.page.html',
  styleUrls: ['./receipt.page.scss'],
})
export class ReceiptPage implements OnInit {
  DateToday: string = new Date().toLocaleDateString();
  Time: string = new Date().toLocaleTimeString();
  imageList:any;
  screen:any;
  state:boolean =false
  name=null;
  Payresult =null;
  VFName=null;
  Acc=null;
  constructor(private modalController:ModalController,private navParams:NavParams,private socialSharing: SocialSharing,private storage: Storage,private base64:Base64, private screenshot: Screenshot) { 

   
  }

  ionViewWillEnter(){
    this.Payresult =this.navParams.get('data')
    this.name =this.navParams.get('data1')
     this.VFName =this.navParams.get('data2')
      this.Acc =this.navParams.get('data3')
 
      this.screenShot();
 
      
  }

  ngOnInit() {
   // this.screenShot();

  }


screenShot(){
  this.screenshot.URI().then(res =>{
this.screen =res.URI
this.state =true

  })
}

Share()
{
  this.socialSharing.share(null,null,this.screen,null /* url */)

  .then(()=>{
   // alert("Success");          
  },
  (err)=>{
   // alert(err)
  })


}
reset() {
  var self = this;
  setTimeout(function(){ 
    self.state = false;
  }, 1000);
}
closeModel(){
  this.modalController.dismiss()
  this.reset();
  }
  
 /* screenShot() {
  this.screenshot.save('jpg', 80, 'myscreenshot').then(res => {
    this.storage.get('imageSereen').then((val) =>{
    if(val==null){
      let filePath:string =res.filePath +"/WM"
      this.base64.encodeFile(filePath).then((base64File :string) =>{
       var first =[];

       var res_cut =base64File;
       first.push(res_cut);
       this.storage.set('imageSereen',first);
       alert('Save 1');

      
      }, (err) =>{
        console.log(err)

      });
    }else{
      let filePath:string =res.filePath +"/WM"
        this.base64.encodeFile(filePath).then((base64File :string)=>{
          var res_cut =base64File;
          val.push(res_cut);
          this.storage.set('imageSereen',val);
          alert('Save 2');
          
        }, (err) =>{
          console.log(err)
        });




    }

    });



  });
  this.getimg();
}
*/


}
