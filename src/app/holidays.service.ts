import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HolidaysService {

  constructor(private hc:HttpClient) { }
  createpackage(data:any):Observable<any>{
    return this.hc.post("holiday/createpackage",data)
      }
      updatepackage(data:any):Observable<any>{
        console.log("Call reached function")
        return this.hc.post("holiday/updatepackage",data)
          }
}
