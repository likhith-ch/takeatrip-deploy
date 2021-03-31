import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {
selectedcity=""
checkindate:any
checkoutdate:any
roomscount:any
  constructor() { }
 ngOnInit():any{
  console.log(this.selectedcity)
 }
cities=["Hyderabad","Chennai","Vijayawada","Vishakapatnam"
]

  onchange(){
    console.log(this.selectedcity)
    console.log(this.checkindate)
    console.log(this.checkoutdate)
    console.log(this.roomscount)
  }
  
}
