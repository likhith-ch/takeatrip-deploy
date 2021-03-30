import { Router } from '@angular/router';
import { LocalstorageService } from './localstorage.service';
import { Component,HostListener,OnInit,OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy {
  title = 'holidaybooking';
  isloggedin:any
  loggeduser:any
  scrolled = 0;
  constructor(private local:LocalstorageService,private router:Router){}
  ngOnInit():void{
    this.local.watchStorage().subscribe(res=>{
      this.isloggedin=res;
    })
    this.local.watchUser().subscribe(res=>{
      this.loggeduser=res;
    })
    if(localStorage.username!=null){
this.isloggedin="added"
this.loggeduser=localStorage.getItem("username")
    }
    if(localStorage.username!=null && localStorage.usertype=="admin" ){
this.router.navigateByUrl("/admin")
this.loggeduser=localStorage.getItem("username")
    }
  }
  ngOnDestroy():void{}
  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event:any) {
    const numb = window.scrollY;
    if (numb > 5){
      this.scrolled = 1;
    }
    else {
      this.scrolled = 0;
    }
  }
  logoutuser(){
    this.local.removeItem()
  }
}
