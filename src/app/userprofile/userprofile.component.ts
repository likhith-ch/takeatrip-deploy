import { LocalstorageService } from './../localstorage.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
userdata:any
isvalid:any
  constructor(private router:Router,private activatedRoute: ActivatedRoute,private userobj:UserService,private toster:ToastrService,private localstorage:LocalstorageService) { }

  ngOnInit(): void {
    this.userobj.getuser({"username":localStorage.getItem("username")}).subscribe(res=>{
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
        this.userdata=res["message"]
           }
      
      
    })
  }
  onSubmit(data:any){
    if(!data.form.invalid){console.log(data.value)}
    if(data.form.invalid){
      this.isvalid=0
    }
    else if(data.value.newpassword!=data.value.reenterpassword){
      this.toster.error("Passwords did not match");
    }
    else{
      let actualdata=data.value
      actualdata.username= localStorage.getItem("username")   
      this.userobj.changepassword(actualdata).subscribe(res=>{
        if(res["message"]=="invalid old password"){
          this.toster.error("Entered current password is wrong.")
        }
        else if(res["message"]=="password changed successfully"){
          this.toster.success("Password changes successfully")
          this.router.navigateByUrl("/userprofile")
        }

     })
    }
  }

}
