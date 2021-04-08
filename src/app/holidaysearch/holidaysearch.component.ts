import { LocalstorageService } from './../localstorage.service';
import { HolidaysService } from './../holidays.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit} from '@angular/core';
import { Options, LabelType } from "@angular-slider/ngx-slider";
@Component({
  selector: 'app-holidaysearch',
  templateUrl: './holidaysearch.component.html',
  styleUrls: ['./holidaysearch.component.css']
})
export class HolidaysearchComponent implements OnInit {
  selectedfromcity:any;
  selectedtocity:any;
  actualfromcity:any;
  actualtocity:any;
  foundpackages=[];
  constructor(private router:Router,private activatedRoute: ActivatedRoute,private toster:ToastrService,private holobj:HolidaysService,private localstorage:LocalstorageService) { }
  fromcity=["Hyderabad","Chennai","Vijayawada","Vishakapatnam","Agra","Eluru","Coimbatore","karimnagar"]
  tocity=["Hyderabad","Chennai","Vijayawada","Vishakapatnam","Agra","Eluru","Coimbatore","karimnagar","Goa"]
  budgetminValue: number = 1000;
  budgetmaxValue: number = 50000;
  budgetoptions: Options = {
    floor: 1000,
    ceil: 50000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return "₹" + value;
        case LabelType.High:
          return "₹" + value;
        default:
          return "₹" + value;
      }
    }
  };
  //for number of days filter
  nightsminValue: number = 2;
  nightsmaxValue: number = 20;
  nightsoptions: Options = {
    floor: 2,
    ceil: 20,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return value + "N";
        case LabelType.High:
          return value + "N";
        default:
          return value + "N";
      }
    }
  };

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.selectedfromcity=params["fromcity"]
      this.selectedtocity=params["tocity"]
    })
    this.actualfromcity=this.selectedfromcity
    this.actualtocity=this.selectedtocity
    this.holobj.getcitypackages(this.actualtocity).subscribe(res=>{
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
      else if(res["message"]=="fetched successfully"){
        this.foundpackages=res["packagelist"]
        console.log(this.foundpackages)
    }
    })
}
  applyfilter(){
    console.log(this.nightsminValue)
    this.holobj.getfilteredpackages({"city":this.actualtocity,"minprice":this.budgetminValue,"maxprice":this.budgetmaxValue,"minnights":this.nightsminValue,
    "maxnights":this.nightsmaxValue}).subscribe(res=>{
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
      else if(res["message"]=="fetched successfully"){
        this.foundpackages=res["filteredpackagelist"]
        console.log(this.foundpackages)
    }


    })
    
  }
  clearfilter(){
    this.nightsminValue=2
    this.nightsmaxValue=20
    this.budgetminValue=1000
    this.budgetmaxValue=50000
    this.holobj.getcitypackages(this.actualtocity).subscribe(res=>{
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
      else if(res["message"]=="fetched successfully"){
        this.foundpackages=res["packagelist"]
        console.log(this.foundpackages)
    }
    })
  }
  searchpackages(){
    this.actualfromcity=this.selectedfromcity
    this.actualtocity=this.selectedtocity
    this.holobj.getcitypackages(this.actualtocity).subscribe(res=>{
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
      else if(res["message"]=="fetched successfully"){
        this.foundpackages=res["packagelist"]
        console.log(this.foundpackages)
    }
    })
    
  }
  bookpackage(data:any){
    localStorage.setItem("packageid",data["package_id"])
    localStorage.setItem("packagename",data["package_name"])
    localStorage.setItem("packageprice",data["package_price"])
    localStorage.setItem("packageduration",data["package_nights"])
    localStorage.setItem("packagecity",data["package_destination_city"])
    localStorage.setItem("packagefeatures",data["package_features"][0])
    localStorage.setItem("packageurl",data['image'])
    this.router.navigateByUrl("/bookservice/holiday")
  }
}
