import { Component,HostListener,OnInit,OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy {
  title = 'holidaybooking';
  scrolled = 0;
  ngOnInit():void{}
  ngOnDestroy():void{}
  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event:any) {
    const numb = window.scrollY;
    if (numb >= 10){
      this.scrolled = 1;
    }
    else {
      this.scrolled = 0;
    }
  }
}
