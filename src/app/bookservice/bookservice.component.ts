import { LocalstorageService } from './../localstorage.service';
import { UserService } from './../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelsService } from './../hotels.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bookservice',
  templateUrl: './bookservice.component.html',
  styleUrls: ['./bookservice.component.css']
})
export class BookserviceComponent implements OnInit {
  servicetype:any
  hoteldata:any
  date1:any
date2:any
ckindt:any
ckoutdt:any
Difference_In_Time:any
numberofdays:any
totalhotelcost:any
rooms:any
  constructor(private router:Router,private activatedRoute: ActivatedRoute,private hotobj:HotelsService,private toster:ToastrService,private userobj:UserService,private localstorage:LocalstorageService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.servicetype=params["servicetype"]
    })
    if(this.servicetype=='hotel'){
      this.ckindt=localStorage.getItem("checkindate")
      this.ckoutdt=localStorage.getItem("checkoutdate")
      this.rooms=localStorage.getItem("rooms")
      this.date1 = new Date(this.ckindt);
      this.date2 = new Date(this.ckoutdt);
        
      // To calculate the time difference of two dates
      this.Difference_In_Time = this.date2.getTime() - this.date1.getTime();
        
      // To calculate the no. of days between two dates
      this.numberofdays = this.Difference_In_Time/ (1000 * 3600 * 24);
      

    this.hotobj.gethotel(localStorage.getItem("hotelid")).subscribe(res=>{
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
      else{
        this.hoteldata=res["message"]
        this.totalhotelcost=this.numberofdays*parseInt(this.rooms)*this.hoteldata["hotel_price_pernight"]
        console.log("hello 123")
        console.log(this.totalhotelcost)
           }
      })}
  }
  bookhotel(data:any){
    if(!data.form.invalid){
    this.userobj.bookhotel({'username':localStorage.getItem("username"),'hoteldata':this.hoteldata,'checkindate':this.ckindt,'checkoutdate':this.ckoutdt,'rooms':this.rooms,'totalprice':this.totalhotelcost}).subscribe(
      res=>{
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
        else if(res["message"]=='hotel booked succesfully'){
          this.toster.success("Hotel rooms successfully booked")
          this.router.navigateByUrl("/")
        }
      })
    console.log("Booked")
  }
    else{this.toster.error("Unable to process payement.")}
  
  }

}
