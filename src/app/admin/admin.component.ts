import { LocalstorageService } from './../localstorage.service';
import { Router } from '@angular/router';
import { HotelsService } from './../hotels.service';
import { HolidaysService } from './../holidays.service';
import { Component, OnInit,OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit,OnDestroy {
  actiontype="view";
  servicetype="holiday"
  packlen:any
  packageitems:any;
  hotlen:any
  hotelitems:any
  viewbtncolor="linear-gradient(to right,#f0772c,#f95776)"
addbtncolor="linear-gradient(to right,rgb(110, 168, 223),#1885f1)"
holidaybtncolor="linear-gradient(to right,#f0772c,#f95776)"
hotelbtncolor="linear-gradient(to right,rgb(110, 168, 223),#1885f1)"
  constructor(private packobj:HolidaysService,private hotobj:HotelsService,private router:Router,private local:LocalstorageService,private toastr: ToastrService) { }
  formdata=new FormData();
  file:any;
  incomingfile(event:any)
  {
  this.file= event.target.files[0];
  }

  ngOnInit(): void {
    if(localStorage.getItem("usertype")!='admin')
    {this.toastr.error("unauthorized access")
  this.router.navigateByUrl("/hotels")}
  else{
    this.packobj.viewpackages().subscribe(res=>{
      if(res["message"]=="failed"){
        this.toastr.error(res["reason"])
        this.local.removeItem();
        this.router.navigateByUrl("/login")
    
      }
      this.packageitems=res["message"]
      this.packlen=this.packageitems.length
    })
    this.hotobj.viewhotels().subscribe(res=>{
      if(res["message"]=="failed"){
        this.local.removeItem();
        this.router.navigateByUrl("/login")
    
      }
      this.hotelitems=res["message"]
      this.hotlen=this.hotelitems.length
    })
  }
  }
  ngOnDestroy():void{
  }
  changactiontype(data:any){
    if(data=="view")
    {
      this.addbtncolor="linear-gradient(to right,rgb(110, 168, 223),#1885f1)"
this.viewbtncolor="linear-gradient(to right,#f0772c,#f95776)"
this.actiontype="view"
    }
    if(data=="add"){
      this.addbtncolor="linear-gradient(to right,#f0772c,#f95776)"
this.viewbtncolor="linear-gradient(to right,rgb(110, 168, 223),#1885f1)"
this.actiontype="add"
    }
  }

  changeservicetype(data:any){
    if(data=="holiday")
    {
      this.hotelbtncolor="linear-gradient(to right,rgb(110, 168, 223),#1885f1)"
this.holidaybtncolor="linear-gradient(to right,#f0772c,#f95776)"
this.servicetype="holiday"
this.packobj.viewpackages().subscribe(res=>{
  if(res["message"]=="failed"){
    this.toastr.error(res["reason"])
    this.local.removeItem();
    this.router.navigateByUrl("/login")

  }
  this.packageitems=res["message"]
  this.packlen=this.packageitems.length
})

    }
    if(data=="hotel"){
this.hotelbtncolor="linear-gradient(to right,#f0772c,#f95776)"
this.holidaybtncolor="linear-gradient(to right,rgb(110, 168, 223),#1885f1)"
this.servicetype="hotel"
this.hotobj.viewhotels().subscribe(res=>{
  if(res["message"]=="failed"){
    this.toastr.error(res["reason"])
    this.local.removeItem();
    this.router.navigateByUrl("/login")

  }
  this.hotelitems=res["message"]
  this.hotlen=this.hotelitems.length
})


    }
  }






  onClickSubmit(data:any){
    console.log(data)
    if(data.activitytype=="create" && data.servicetype=="hotel")
    {
    this.formdata.append('image',this.file,this.file.name);
    this.formdata.append("hotelObj",JSON.stringify(data));

    this.hotobj.createhotel(this.formdata).subscribe(
      res=>{
        if(res["message"]=="failed"){
          this.toastr.error(res["reason"])
          this.local.removeItem();
          this.router.navigateByUrl("/login")

        }
        if(res["message"]=="hotel successfully added"){
          this.toastr.success("Hotel added Sucessfully")
          this.router.navigateByUrl("/admin")
        }
        else{
      this.toastr.warning("Hotel id already exists please try to update hotel if needed.")
        }

      },
      err=>{this.toastr.error("something went wrong")
    console.log("error")}
    )
    }
    if(data.activitytype=="create" && data.servicetype=="holiday")
    {
    this.formdata.append('image',this.file,this.file.name);
    this.formdata.append("holidayObj",JSON.stringify(data));
    this.packobj.createpackage(this.formdata).subscribe(
      res=>{
        if(res["message"]=="failed"){
          this.toastr.error(res["reason"])
          this.local.removeItem();
          this.router.navigateByUrl("/login")

        }
        if(res["message"]=="Holiday Package successfully added" ){
          this.toastr.success("Holiday Package successfully added")
          this.router.navigateByUrl("/admin")
        }
        else{
          this.toastr.warning("Holiday package already exists please try to update Package if needed.")
        }

      },
      err=>{this.toastr.error("something went wrong")
    console.log("error")}
    )
    }
    if(data.activitytype=="modify" && data.servicetype=="hotel")
    {
      if(data.hotelid=="" )
    {
      this.toastr.warning("Select Hotel Id")
      return;
    }
      this.hotobj.updatehotel(data).subscribe(
        res=>{
          if(res["message"]=="failed"){
            this.toastr.error(res["reason"])
            this.local.removeItem();
            this.router.navigateByUrl("/login")
  
          }
          if(res["message"]=="Hotel updated successfully"){
        this.toastr.success("Hotel updated successfully")
            this.router.navigateByUrl("/admin")
          }
  
        },
        err=>{this.toastr.error("something went wrong")
      console.log("error")}
      )
    }
    if(data.activitytype=="modify" && data.servicetype=="holiday")
    {if(data.packageid=="" )
    {
     this.toastr.warning("Select package Id")
      return;
    }
      this.packobj.updatepackage(data).subscribe(
        res=>{
          if(res["message"]=="failed"){
            this.toastr.error(res["reason"])
            this.local.removeItem();
            this.router.navigateByUrl("/login")
  
          }
          if(res["message"]=="Holiday package updated successfully"){
            this.toastr.success("Holiday package updated successfully")
            this.router.navigateByUrl("/admin")
          }
  
        },
        err=>{this.toastr.error("something went wrong")
      console.log("error")}
      )
  
      
    }
   /* this..saveProductData(this.formdata).subscribe(
      res=>{
        if(res["message"]=="product successfully added"){
          alert("Product added Sucessfully")
          this.router.navigateByUrl("/addproduct")
        }
        else{
          alert("Product id already exists please try another")
        }

      },
      err=>{alert("something went wrong")
    console.log("error")}
    )*/
   }

   deletepackageitem(data:any){
     this.packobj.deletepackage(data).subscribe(res=>{
       if(res["message"]=="Package deleted successfully")
       {
         this.packlen=this.packlen-1
         this.toastr.success("package deleted successfully");
       }
     })
   }
   deletehotelitem(data:any){
    this.hotobj.deletehotel(data).subscribe(res=>{
      if(res["message"]=="Hotel deleted successfully")
      {
        this.hotlen=this.hotlen-1
        this.toastr.success("Hotel deleted successfully");
      }
    })
  }
}
