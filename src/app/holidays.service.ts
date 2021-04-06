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
        return this.hc.post("holiday/updatepackage",data)
          }
          viewpackages():Observable<any>{
            return this.hc.get("holiday/getpackages")
              }
              getcitypackages(data:any):Observable<any>{
                return this.hc.get("holiday/getcitypackage/"+data)
                  }
              deletepackage(data:any):Observable<any>{
                return this.hc.delete("holiday/deletepackage/"+data)
              }
              getfilteredpackages(data:any):Observable<any>{
                return this.hc.post("holiday/getfilteredpackages",data)
              }
}
