import { LocalstorageService } from './../localstorage.service';
import { ToastrService } from 'ngx-toastr';
import { HotelsService } from './../hotels.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-userbookings',
  templateUrl: './userbookings.component.html',
  styleUrls: ['./userbookings.component.css']
})
export class UserbookingsComponent implements OnInit {

  constructor(private router:Router,private activatedRoute: ActivatedRoute,private hotobj:HotelsService,private toster:ToastrService,private localstorage:LocalstorageService) { 

  }

  ngOnInit(): void {
    
  }

}
