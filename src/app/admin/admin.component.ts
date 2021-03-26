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
  constructor(private packobj:HolidaysService,private hotobj:HotelsService,private router:Router) { }
  formdata=new FormData();
  file:any;
  incomingfile(event:any)
  {
  this.file= event.target.files[0];
  }

  ngOnInit(): void {
  }
  ngOnDestroy():void{
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
}
