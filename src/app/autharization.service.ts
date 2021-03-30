import { Injectable } from '@angular/core';
import {HttpRequest,HttpInterceptor,HttpHandler,HttpEvent} from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AutharizationService {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    let token=localStorage.getItem("token")
    if(token==undefined)
    {
      return next.handle(req)
    }
   else{
     let modifiedReqObj=req.clone({headers:req.headers.set("Authorization","Bearer "+token)})
     return next.handle(modifiedReqObj)
   }
  }
}
