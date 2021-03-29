import { Router } from '@angular/router';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isvalid:any
  constructor(private userobj:UserService,private router:Router) { }

  ngOnInit(): void {
  }
  onSubmit(data:any){
    if(!data.form.invalid){console.log(data.value)}
    if(data.form.invalid){
      this.isvalid=0
    }
    else if(data.value.password!=data.value.password1){
      alert("Passwords did not match");
    }
    else{
     this.userobj.createuser(data.value).subscribe(res=>{
       if(res["message"]=="User already exists"){
alert("User name already exists please try another username");
this.router.navigateByUrl("/register")
       }
       if(res["message"]=="User sucessfully created"){
        alert("User sucessfully created");
        this.router.navigateByUrl("/login")
               }
        else{alert("Something went wrong");}
       
     })
    }
  }
}
