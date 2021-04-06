import { ToastrService } from 'ngx-toastr';
import { LocalstorageService } from './../localstorage.service';
import { HolidaysService } from './../holidays.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.css']
})
export class HolidaysComponent implements OnInit {

  constructor(private router:Router,private holobj:HolidaysService, private localstorage:LocalstorageService,private toster:ToastrService) { }
  selectedfromcity:any="";
  selectedtocity:any="";
  fromcity=["Hyderabad","Chennai","Vijayawada","Vishakapatnam","Agra","Eluru","Coimbatore","karimnagar"]
  tocity=["Hyderabad","Chennai","Vijayawada","Vishakapatnam","Agra","Eluru","Coimbatore","karimnagar","Goa"]

  ngOnInit(): void {
  }
  onchange(){
    console.log(this.selectedfromcity)
    console.log(this.selectedtocity)
    
  }
  holidaysearch(){
    this.holobj.getcitypackages(this.selectedtocity).subscribe(res=>{
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
      console.log(res["packagelist"])
    this.router.navigateByUrl("/holidaysearch/"+this.selectedfromcity+"/"+this.selectedtocity)
  }
  })
  }

}
