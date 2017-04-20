import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from 'ng2-ui-auth';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators, AbstractControl} from '@angular/forms';
import {ILoginData} from './auth.interfaces';
import {AppState} from '../app.service';
import {ErrorHandleService} from '../services/error-handle.service';
import {FormHelperService} from '../services/form-helper.service';

@Component ({
  encapsulation: ViewEncapsulation.None,
  selector: 'app',
  styleUrls: ['./login.less'],
  templateUrl: './login-page.html'
})

export class LoginComponent implements OnInit {
  public loggedUser: FormGroup;
  public username: AbstractControl;
  public password: AbstractControl;

  constructor (public appState: AppState,
               private fb: FormBuilder,
               private auth: AuthService,
               private router: Router,
               private eh: ErrorHandleService,
               public fh: FormHelperService) {
  }

  public ngOnInit () {
    console.log ('Initial App State', this.appState.state);
    this.loggedUser = this.fb.group ({
      username: new FormControl ('', [Validators.required, Validators.minLength (3)]),
      password: new FormControl ('', [Validators.required, Validators.minLength (6)]),
    });
  }

  public login (loginData: ILoginData) {
    //console.log (' Login Data is ::: ' + JSON.stringify (loginData));
    this.auth.login (loginData).subscribe ({
      complete: () => this.router.navigateByUrl ('home'),
      error: (err: any) => this.eh.handleError (err)
    });
  }
}
