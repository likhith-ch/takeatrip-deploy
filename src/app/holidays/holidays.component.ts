import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.css']
})
export class HolidaysComponent implements OnInit {

  constructor() { }
  selectedfromcity:any="";
  selectedtocity:any="";
  fromcity=["Hyderabad","Chennai","Vijayawada","Vishakapatnam","Agra","Eluru","Coimbatore","karimnagar"]
  tocity=["Hyderabad","Chennai","Vijayawada","Vishakapatnam","Agra","Eluru","Coimbatore","karimnagar"]

  ngOnInit(): void {
  }
  onchange(){
    console.log(this.selectedfromcity)
    console.log(this.selectedtocity)
    
  }

}
