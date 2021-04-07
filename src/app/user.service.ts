import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private hc:HttpClient) { }
createuser(data:any):Observable<any>{
  return this.hc.post("/user/createuser",data);
}
loginuser(data:any):Observable<any>{
  return this.hc.post("user/checkpasswordasync",data)
}
getuser(data:any):Observable<any>{
  return this.hc.get("user/getuser/"+data.username)
}
loginadmin(data:any):Observable<any>{
  return this.hc.post("admin/checkpasswordasync",data)
}
bookhotel(data:any):Observable<any>
{
  return this.hc.post("user/bookhotel",data)
}
bookholiday(data:any):Observable<any>
{
  console.log("hello",data)
  return this.hc.post("user/bookholiday",data)
}
}
