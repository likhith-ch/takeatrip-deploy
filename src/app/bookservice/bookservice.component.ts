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
tripenddate:any="Please select start date"
ckindt:any;ckoutdt:any;Difference_In_Time:any;numberofdays:any;totalhotelcost:any;rooms:any
packagename:any;packagecost:any;packagedays:any;packagecity:any;packagefacilities:any;
packageheadcount=1
finalpackagecost:any
packagestartdate:any
startdatetostring:any
packageobj:any={}
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
      //for holiday service
      if(this.servicetype=='holiday')
      {
      this.packagename=localStorage.getItem("packagename");
      this.packagecost=localStorage.getItem("packageprice");
      this.packagedays=localStorage.getItem("packageduration");
      this.packagecity=localStorage.getItem("packagecity");
      this.packagefacilities=localStorage.getItem("packagefeatures");
      this.finalpackagecost=this.packageheadcount*parseInt(this.packagecost)
      this.packageobj["package_name"]=this.packagename;this.packageobj["package_cost"]=this.packagecost;
      this.packageobj["package_days"]=this.packagedays;this.packageobj["package_destination_city"]=this.packagecity;
      this.packageobj["package_facilities"]=this.packagefacilities
      this.packageobj["image"]=localStorage.getItem("packageurl")
      }
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
  onchange(){
    this.finalpackagecost=this.packageheadcount*parseInt(this.packagecost)
  }
  onchangedate(){

this.startdatetostring=new Date(this.packagestartdate).toDateString()
this.tripenddate = new Date(new Date(this.packagestartdate).getTime()+(parseInt(this.packagedays)*24*60*60*1000)).toDateString();
  }

  bookholiday(data:any){
    if(!data.form.invalid && this.startdatetostring!=undefined && new Date(this.packagestartdate)>new Date() ){
    this.userobj.bookholiday({'username':localStorage.getItem("username"),'packageobj':this.packageobj,'totalpeople':this.packageheadcount,'tripstartdate':this.startdatetostring,'tripenddate':this.tripenddate,'totalpackagecost':this.finalpackagecost}).subscribe(
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
        else if(res["message"]=='package booked succesfully'){
          this.toster.success("Holiday Package successfully booked")
          this.router.navigateByUrl("/")
        }
      })
  }
    else if(data.form.invalid){this.toster.error("Unable to process payement.")}
    else if(this.startdatetostring==undefined){this.toster.warning("Please select trip start date.")}
    else if(new Date(this.packagestartdate)<=new Date()){this.toster.warning("You can only book packages for future.")}

  
  }

}
