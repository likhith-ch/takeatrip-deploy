import { LocalstorageService } from './../localstorage.service';
import { Router } from '@angular/router';
import { HotelsService } from './../hotels.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import {formatDate} from '@angular/common';


@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {
selectedcity=""
checkindate:any
checkoutdate:any
roomscount:any
todaydate = formatDate(new Date(),'yyyy-MM-dd','en_US');
  constructor(private toster:ToastrService,private hotobj:HotelsService,private router:Router,private localstorage:LocalstorageService) { }
 ngOnInit():any{
  console.log(this.selectedcity)
 }
cities=["Hyderabad","Chennai","Banglore","Vijayawada","Kochi","Goa","Mumbai","kolkata","Delhi"]

  onchange(){
    console.log(this.selectedcity)
    console.log(this.checkindate)
    console.log(this.checkoutdate)
    console.log(this.roomscount)
  }
  hotelsearch(){
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
        else{
          this.router.navigateByUrl( '/hotelsearch/'+(this.selectedcity)+'/'+(this.checkindate)+'/'+this.checkoutdate+'/'+this.roomscount);
             }
      })
    }
  }
  
}
