import { LocalstorageService } from './../localstorage.service';
import { ToastrService } from 'ngx-toastr';
import { HotelsService } from './../hotels.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-hotelsearch',
  templateUrl: './hotelsearch.component.html',
  styleUrls: ['./hotelsearch.component.css']
})
export class HotelsearchComponent implements OnInit {

  constructor(private router:Router,private activatedRoute: ActivatedRoute,private hotobj:HotelsService,private toster:ToastrService,private localstorage:LocalstorageService) {}
  cities=["Hyderabad","Chennai","Banglore","Vijayawada","Kochi","Goa","Mumbai","kolkata","Delhi"]
  selectedcity=""
  checkindate:any
  checkoutdate:any
  roomscount:any
  actualroomscount:any
  actualcheckindate:any
  actualcheckoutdate:any
  availablehotels:any
  todaydate = formatDate(new Date(),'yyyy-MM-dd','en_US');
  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe(params => {
      this.selectedcity=params["city"]
      this.checkindate=params["checkindate"]
      this.checkoutdate=params["checkoutdate"]
      this.roomscount=params["roomscount"]

})
this.actualroomscount=this.roomscount
this.actualcheckindate=this.checkindate
this.actualcheckoutdate=this.checkoutdate
this.hotobj.checkhotelavailability({"checkindate":this.checkindate,"checkoutdate":this.checkoutdate,"city":this.selectedcity,"rooms":this.roomscount}).subscribe(res=>{
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
  else if(res["message"]=="hotels searched"){
    this.availablehotels=res["hotelslist"]
       }
})


  }
  hotelsearch(){
    this.actualroomscount=this.roomscount
    this.actualcheckindate=this.checkindate
    this.actualcheckoutdate=this.checkoutdate
    if(this.checkindate==undefined || this.checkoutdate==undefined || this.roomscount==undefined || this.selectedcity=="")
    {
      this.toster.warning("Please enter all feilds to proceed")
    }
    else if(!this.cities.includes(this.selectedcity))
    {this.toster.warning("No hotels found in city you entered")}
    else if(this.todaydate>this.checkindate || this.todaydate>this.checkoutdate ){
      this.toster.warning("Please select valid dates")
    }
    else if(this.checkindate>this.checkoutdate){
      this.toster.warning("Check out date should be after  chekin date")
    }
    else{
    this.hotobj.checkhotelavailability({"checkindate":this.checkindate,"checkoutdate":this.checkoutdate,"city":this.selectedcity,"rooms":this.roomscount}).subscribe(res=>{
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
      else if(res["message"]=="hotels searched"){
        this.availablehotels=res["hotelslist"]
           }
    })
  }
    //this.router.navigateByUrl( '/hotelsearch/'+(this.selectedcity)+'/'+(this.checkindate)+'/'+this.checkoutdate+'/'+this.roomscount);
  }
  bookhotel(hotelid:any,hname:any,hcity:any,hprice:any){
    localStorage.setItem("hotelid",hotelid)
    localStorage.setItem("hotelname",hname)
    localStorage.setItem("hotelcity",hcity)
    localStorage.setItem("hotelprice",hprice)
    localStorage.setItem("checkindate",this.actualcheckindate)
    localStorage.setItem("checkoutdate",this.actualcheckoutdate)
    localStorage.setItem("rooms",this.actualroomscount)
    this.router.navigateByUrl("bookservice/hotel")

  }

}
