import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Event} from '../vo/Event';
import {FormHelperService} from '../services/form-helper.service';
import {ErrorHandleService} from '../services/error-handle.service';
import {AppState} from '../app.service';
import {DateModel, DatePickerOptions} from 'ng2-datepicker';
import {EventService} from '../services/event.services';

@Component({
  selector: 'events',
  templateUrl: './event.component.html',
  styleUrls: ['./events.less']
})

export class EventComponent implements OnInit {
  public eventForm: FormGroup;
  public date: DateModel;
  public options: DatePickerOptions;
  public eventSubmitted;

  constructor(public appState: AppState,
              private fb: FormBuilder,
              private eh: ErrorHandleService,
              public fh: FormHelperService,
              private eventService: EventService) {
    console.log('THis is App State is  :: ', this.appState.state);
    this.options = new DatePickerOptions();
  }

  public ngOnInit() {
    this.eventSubmitted = false;
    this.eventForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      description: new FormControl('', [Validators.required, Validators.minLength(10)]),
      venue: new FormControl('', [Validators.required, Validators.minLength(5)]),
      date: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }

  public createForm(event: Event) {
    this.eventSubmitted = true;
    this.eventService.createEvent(event)
      .then((data) => {
        console.log('Data is coming from ::: ', data);
      })
      .catch((err: any) => {
        this.eh.handleError (err);
      });
    console.log(' Event is :  ', JSON.stringify(event));
  }
}
