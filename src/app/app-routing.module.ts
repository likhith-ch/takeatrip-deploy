import { HotelsComponent } from './hotels/hotels.component';
import { HolidaysComponent } from './holidays/holidays.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{path:"admin",component:AdminComponent},
                        {path:"login",component:LoginComponent},
                        {path:"register",component:RegisterComponent},
                        {path:"holidays",component:HolidaysComponent},
                        {path:"hotels",component:HotelsComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
