import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HotelsService {
  

  constructor(private hc:HttpClient) { }
  createhotel(data:any):Observable<any>{
return this.hc.post("hotels/createhotel",data)
  }
  updatehotel(data:any):Observable<any>{
    return this.hc.post("hotels/updatehotel",data)
      }
      viewhotels():Observable<any>{
        return this.hc.get("hotels/gethotels")
          }
          gethotel(data:any):Observable<any>{
            return this.hc.get("hotels/gethotel/"+data)
              }
          deletehotel(data:any):Observable<any>{
            return this.hc.delete("hotels/deletehotel/"+data)
          }
          checkhotelavailability(data:any):Observable<any>
          {
            return this.hc.post("hotels/checkavailablehotels",data)
          }
         
}
