import { UserService } from './../user.service';
import { LocalstorageService } from './../localstorage.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-userbookings',
  templateUrl: './userbookings.component.html',
  styleUrls: ['./userbookings.component.css']
})
export class UserbookingsComponent implements OnInit {
userdata:any
holidaybtncolor="linear-gradient(to right,#f0772c,#f95776)"
hotelbtncolor="linear-gradient(to right,rgb(110, 168, 223),#1885f1)"
servicetype="holiday"
  constructor(private router:Router,private activatedRoute: ActivatedRoute,private userobj:UserService,private toster:ToastrService,private localstorage:LocalstorageService) { 

  }
  changeservicetype(data:any){
    if(data=="hotels")
    {
      this.holidaybtncolor="linear-gradient(to right,rgb(110, 168, 223),#1885f1)"
this.hotelbtncolor="linear-gradient(to right,#f0772c,#f95776)"
this.servicetype="hotel"
    }
    if(data=="holidays"){
      this.holidaybtncolor="linear-gradient(to right,#f0772c,#f95776)"
this.hotelbtncolor="linear-gradient(to right,rgb(110, 168, 223),#1885f1)"
this.servicetype="holiday"
    }
  }
  cancelpackage(data:any){
  this.userobj.cancelholiday(data).subscribe(res=>{
    if(res["message"]=="failed" && res["reason"]=="unauthorized access"){
      this.localstorage.removeItem()
      this.toster.info("You should Login to Proceed")
      this.router.navigateByUrl("/login")
    
    }
    else if(res["message"]=="failed"){
      this.localstorage.removeItem()
      this.toster.info("Session expired please login again")
      this.router.navigateByUrl("/login")
    }
    else if(res["message"]=="package canceled succesfully"){
      this.userdata["package"]=res["updatedpackage"]
      this.toster.success("Holiday Package Canceled,You will get refund in 5 working days")
         }
  })  
  }
  cancelhotel(data:any){

    this.userobj.cancelhotel(data).subscribe(res=>{
      if(res["message"]=="failed" && res["reason"]=="unauthorized access"){
        this.localstorage.removeItem()
        this.toster.info("You should Login to Proceed")
        this.router.navigateByUrl("/login")
      
      }
      else if(res["message"]=="failed"){
        this.localstorage.removeItem()
        this.toster.info("Session expired please login again")
        this.router.navigateByUrl("/login")
      }
      else if(res["message"]=="rooms canceled succesfully"){
        this.userdata["rooms"]=res["updatedrooms"]
        this.toster.success("Hotel rooms Canceled,You will get refund in 5 working days")
           }
    })  

  }
  bookholidays(){
    this.router.navigateByUrl('/holidays');
  }
  bookhotels(){this.router.navigateByUrl('/hotels');}

  ngOnInit(): void {
this.userobj.getuser({"username":localStorage.getItem("username")}).subscribe(res=>{
  this.userdata=res["message"]
  console.log(this.userdata)
})
  }

}
