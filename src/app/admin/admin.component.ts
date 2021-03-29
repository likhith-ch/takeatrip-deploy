import { Router } from '@angular/router';
import { HotelsService } from './../hotels.service';
import { HolidaysService } from './../holidays.service';
import { Component, OnInit,OnDestroy } from '@angular/core';

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
  constructor(private packobj:HolidaysService,private hotobj:HotelsService,private router:Router) { }
  formdata=new FormData();
  file:any;
  incomingfile(event:any)
  {
  this.file= event.target.files[0];
  }

  ngOnInit(): void {
    this.packobj.viewpackages().subscribe(res=>{
      this.packageitems=res["message"]
      this.packlen=this.packageitems.length
    })
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
  this.packageitems=res["message"]
  this.packlen=this.packageitems.length
})

    }
    if(data=="hotel"){
this.hotelbtncolor="linear-gradient(to right,#f0772c,#f95776)"
this.holidaybtncolor="linear-gradient(to right,rgb(110, 168, 223),#1885f1)"
this.servicetype="hotel"
this.hotobj.viewhotels().subscribe(res=>{
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
        if(res["message"]=="hotel successfully added"){
          alert("Hotel added Sucessfully")
          this.router.navigateByUrl("/admin")
        }
        else{
          alert("Hotel id already exists please try to update hotel if needed.")
        }

      },
      err=>{alert("something went wrong")
    console.log("error")}
    )
    }
    if(data.activitytype=="create" && data.servicetype=="holiday")
    {
    this.formdata.append('image',this.file,this.file.name);
    this.formdata.append("holidayObj",JSON.stringify(data));
    this.packobj.createpackage(this.formdata).subscribe(
      res=>{
        if(res["message"]=="Holiday Package successfully added"){
          alert("Holiday Package successfully added")
          this.router.navigateByUrl("/admin")
        }
        else{
          alert("Holiday package already exists please try to update Package if needed.")
        }

      },
      err=>{alert("something went wrong")
    console.log("error")}
    )
    }
    if(data.activitytype=="modify" && data.servicetype=="hotel")
    {
      this.hotobj.updatehotel(data).subscribe(
        res=>{
          if(res["message"]=="Hotel updated successfully"){
            alert("Hotel updated successfully")
            this.router.navigateByUrl("/admin")
          }
  
        },
        err=>{alert("something went wrong")
      console.log("error")}
      )
    }
    if(data.activitytype=="modify" && data.servicetype=="holiday")
    {
      this.packobj.updatepackage(data).subscribe(
        res=>{
          if(res["message"]=="Holiday package updated successfully"){
            alert("Holiday package updated successfully")
            this.router.navigateByUrl("/admin")
          }
  
        },
        err=>{alert("something went wrong")
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
         alert("package deleted successfully");
       }
     })
   }
   deletehotelitem(data:any){
    this.hotobj.deletehotel(data).subscribe(res=>{
      if(res["message"]=="Hotel deleted successfully")
      {
        this.hotlen=this.hotlen-1
        alert("Hotel deleted successfully");
      }
    })
  }
}
