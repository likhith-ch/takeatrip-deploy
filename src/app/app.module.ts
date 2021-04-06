import { AutharizationService } from './autharization.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import {  HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HolidaysComponent } from './holidays/holidays.component';
import { HotelsComponent } from './hotels/hotels.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { TravelblogComponent } from './travelblog/travelblog.component';
import { HotelsearchComponent } from './hotelsearch/hotelsearch.component';
import { BookserviceComponent } from './bookservice/bookservice.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    LoginComponent,
    RegisterComponent,
    HolidaysComponent,
    HotelsComponent,
    TravelblogComponent,
    HotelsearchComponent,
    BookserviceComponent,
    UserprofileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    AppRoutingModule,
    ToastrModule.forRoot({positionClass: 'toast-top-center'})
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:AutharizationService,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
