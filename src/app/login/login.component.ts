import { LocalstorageService } from './../localstorage.service';
import { Router } from '@angular/router';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isuservalid:any
  isadminvalid:any
userbtncolor="linear-gradient(to right,#f0772c,#f95776)"
adminbtncolor="linear-gradient(to right,rgb(110, 168, 223),#1885f1)"
usertype="user"
  constructor(private userobj:UserService,private router:Router,private local:LocalstorageService) { }
  changeusertype(data:any){
    if(data=="admin")
    {
      this.userbtncolor="linear-gradient(to right,rgb(110, 168, 223),#1885f1)"
this.adminbtncolor="linear-gradient(to right,#f0772c,#f95776)"
this.usertype="admin"
    }
    if(data=="user"){
      this.userbtncolor="linear-gradient(to right,#f0772c,#f95776)"
this.adminbtncolor="linear-gradient(to right,rgb(110, 168, 223),#1885f1)"
this.usertype="user"
    }
  }
  onSubmit(data:any){
    if(!data.form.invalid){
      if(this.usertype=="user"){
        console.log(data.value)
          this.userobj.loginuser(data.value).subscribe(res=>{
            if(res["message"]=="failed"){
              alert(res["reason"])
              this.router.navigateByUrl("/login")
    
            }
            if(res["message"]=="invalid username"){alert("invalid username");
            this.router.navigateByUrl("/login");
           }
           if(res["message"]=="login success"){
            this.router.navigateByUrl("/");
            this.local.setItem("username",res.username)
            this.local.setItem("token",res.token)
            localStorage.setItem("usertype","user")
           }
          
           })
          }
          if(this.usertype=="admin"){
            this.userobj.loginadmin(data.value).subscribe(res=>{
              if(res["message"]=="invalid username"){alert("invalid username");
              this.router.navigateByUrl("/login");
             }
             if(res["message"]=="login success"){
              this.router.navigateByUrl("/admin");
              this.local.setItem("username",res.username)
            this.local.setItem("token",res.token)
            localStorage.setItem("usertype","admin")
             }
            
             })
          }

    }
    if(data.form.invalid){
      if(this.usertype=="user")
      {
this.isuservalid=0
this.isadminvalid=1
}
if(this.usertype=="admin"){this.isadminvalid=0
  this.isuservalid=1}
    }

    
  }
  ngOnInit(): void {
  }

}
