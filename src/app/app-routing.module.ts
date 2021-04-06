import { UserprofileComponent } from './userprofile/userprofile.component';
import { BookserviceComponent } from './bookservice/bookservice.component';
import { HotelsearchComponent } from './hotelsearch/hotelsearch.component';
import { HotelsComponent } from './hotels/hotels.component';
import { HolidaysComponent } from './holidays/holidays.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  redirectTo: 'hotels'
},
  {path:"admin",component:AdminComponent},
                        {path:"login",component:LoginComponent},
                        {path:"register",component:RegisterComponent},
                        {path:"holidays",component:HolidaysComponent},
                        {path:"hotels",component:HotelsComponent},
                        {path:"hotelsearch/:city/:checkindate/:checkoutdate/:roomscount",component:HotelsearchComponent},
                        {path:"bookservice/:servicetype",component:BookserviceComponent},
                        {path:"userprofile",component:UserprofileComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
