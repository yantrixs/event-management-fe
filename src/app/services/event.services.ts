import 'rxjs/add/operator/toPromise';
import {Injectable} from '@angular/core';
import {Event} from '../vo/Event';
import {HttpService} from './http.service';

@Injectable()
export class EventService {
  private baseUrl = 'http://localhost:5000';  // URL to public

  constructor(private http: HttpService) {

  }

  public createEvent(event: Event): Promise<Event> {
    if(event.id) {
      return this.put(event);
    }
    return this.post(event);
  }

  public getAvailableEvents(): Promise<Event[]> {
    return this.getEvents();
  }

  private getEvents() {
    return this.http
      .get(this.baseUrl + '/events',).toPromise()
      .then((response) => response.json() as Event[])
      .catch(this.handleError);
  }

  private post(event: Event): Promise<Event> {
    let url = this.baseUrl + '/event';
    return this.http
      .post(url, JSON.stringify(event)).toPromise()
      .then((res) => res.json())
      .catch(this.handleError);
  }

  // Update existing Event
  private put(event: Event): Promise<Event> {
    let url = `${this.baseUrl}/${event.id}`;
    return this.http
      .put(url, JSON.stringify(event))
      .toPromise()
      .then(() => event)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
