import {Routes} from '@angular/router';
import {HomeComponent} from './home';
import {SignUpComponent} from './auth/sign-up.component';
import {LoginComponent} from './auth/login.component';
import {AuthGuard} from './services/auth.guard';
import {EventComponent} from './events/event.component';
import {NotificationComponent} from './notifications/notification.component';

export const CLIENT_ROUTER_PROVIDERS = [
  AuthGuard
];
export const ROUTES: Routes = [
  {path: '', component: LoginComponent},
  {path: 'register', component: SignUpComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'event', component: EventComponent, canActivate: [AuthGuard]},
  {path: 'notification', component: NotificationComponent, canActivate: [AuthGuard]}
];
