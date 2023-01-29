import { Routes } from "@angular/router";
import { AddArchitectureComponent } from "./app/components/architecture/add-new-architecture/add-architecture.component";
import { DisplayArchitectureComponent } from "./app/components/architecture/display-all-architecture/display-architecture.component";
import { EditArchitectureComponent } from "./app/components/architecture/edit-architecture/edit-architecture.component";
import { CalendarComponent } from "./app/components/calandar/calendar-body.component";
import { LandingPageComponent } from "./app/components/landing-page/landing-page.component";
import { LoginComponent } from "./app/components/login/login.component";
import { ProfileComponent } from "./app/components/profile/profile.component";
import { RegisterComponent } from "./app/components/register/register.component";
import { AddResouceComponent } from "./app/components/resources/add-new-resource/add-resource.component";
import { DisplayResourcesComponent } from "./app/components/resources/display-all-resources/display-resources.component";
import { EditResourceComponent } from "./app/components/resources/edit-resource/edit-resource.component";
import { StatsComponent } from "./app/components/stats/stats.component";
import { AddUserComponent } from "./app/components/user/add-user/add-user.component";
import { DisplayUserComponent } from "./app/components/user/display-user/display-user.component";
import { EditUserComponent } from "./app/components/user/edit-user/edit-user.component";
import { AuthGuard } from "./app/Guards/auth.guard";

export const appRoutes: Routes =  [
    {path: 'architectures/add', component: AddArchitectureComponent, canActivate: [AuthGuard]},
    {path: 'architectures/:id', component: EditArchitectureComponent, canActivate: [AuthGuard]},
    {path: 'architectures', component: DisplayArchitectureComponent, canActivate: [AuthGuard]},

    {path: 'resources/add', component: AddResouceComponent, canActivate: [AuthGuard]},
    {path: 'resources/:id', component: EditResourceComponent, canActivate: [AuthGuard]},
    {path: 'resources', component: DisplayResourcesComponent, canActivate: [AuthGuard]},

    {path: 'user/add', component: AddUserComponent, canActivate: [AuthGuard]},
    {path: 'user/:id', component: EditUserComponent, canActivate: [AuthGuard]},
    {path: 'user', component: DisplayUserComponent, canActivate: [AuthGuard]},

    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'landing', component: LandingPageComponent},

    {path: 'calendar', component: CalendarComponent},

    {path: 'profil', component: ProfileComponent},

    {path: 'stats', component: StatsComponent},

    { path: '**', redirectTo: '/landing', pathMatch: 'full' },

]