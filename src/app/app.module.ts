import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { appRoutes } from 'src/routes';
import { AppComponent } from './app.component';
import { AddArchitectureComponent } from './components/architecture/add-new-architecture/add-architecture.component';
import { DisplayArchitectureComponent } from './components/architecture/display-all-architecture/display-architecture.component';
import { EditArchitectureComponent } from './components/architecture/edit-architecture/edit-architecture.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavBarComponent } from './components/nav-bar/navbar.component';
import { AddResouceComponent } from './components/resources/add-new-resource/add-resource.component';
import { DisplayResourcesComponent } from './components/resources/display-all-resources/display-resources.component';
import { EditResourceComponent } from './components/resources/edit-resource/edit-resource.component';
import { AddUserComponent } from './components/user/add-user/add-user.component';
import { DisplayUserComponent } from './components/user/display-user/display-user.component';
import { ArchitectureService } from './service/architecture.service';
import { ResourcesService } from './service/resource.service';
import { UserService } from './service/user.service';
import { SwiperModule } from "swiper/angular";
import { AuthService } from './service/auth.service';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './service/auth.interceptor';
import { AuthGuard } from './Guards/auth.guard';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { EditUserComponent } from './components/user/edit-user/edit-user.component';
import { RegisterComponent } from './components/register/register.component';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarComponent } from './components/calandar/calendar-body.component';
import { CommonModule } from '@angular/common';
import { CalendarService } from './service/calendar.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileComponent } from './components/profile/profile.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { StatsComponent } from './components/stats/stats.component';



@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    DisplayArchitectureComponent,
    FooterComponent, 
    EditArchitectureComponent,
    AddArchitectureComponent,
    DisplayResourcesComponent,
    AddResouceComponent,
    EditResourceComponent,
    DisplayUserComponent,
    AddUserComponent,
    LoginComponent,
    LandingPageComponent,
    EditUserComponent,
    RegisterComponent,
    CalendarComponent,
    ProfileComponent,
    StatsComponent,
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),    
    FormsModule, 
    ReactiveFormsModule,
    SwiperModule,
    CommonModule, 
    CalendarModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    BrowserAnimationsModule,
    NgxChartsModule,
  ],
  providers: [
    ArchitectureService,
    ResourcesService,
    UserService,
    AuthService,
    AuthInterceptor,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthGuard,
    CalendarService,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
