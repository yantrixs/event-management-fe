import {Component, OnInit} from '@angular/core';
import {AppState} from '../app.service';
import {EventService} from '../services/event.services';
//import {ErrorHandleService} from '../services/error-handle.service';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'home',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: ['./home.component.css'],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  public currentEvents = [];
  // Set our default values
  public localState = {value: ''};
  // TypeScript public modifiers
  constructor(public appState: AppState,
              private es: EventService) {
  }

  public ngOnInit() {
    console.log('hello `Home` component');
    // this.title.getData().subscribe(data => this.data = data);
    this.getAvailableEvents();
  }

  public submitState(value: string) {
    console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
  }

  /* public formHandler (formData) {
   console.log ('Click handler', formData);
   }*/

  private getAvailableEvents() {
    this.es.getAvailableEvents().then((events) => {
      this.currentEvents = events;
      console.log(' Here is the data is coming :: ', events);
    })
      .catch((error) => console.log(error));
  }
}
