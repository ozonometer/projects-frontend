import { Component } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(private http: HttpClient) {}

  postData = {
    created: '2020-04-19',
    updated: '2020-04-19',
    name: 'Test Pr 2',
    shortInfo: 'Awesome short description',
    projectDescription: []
  };

  projects = {};

  sendPost() {
    this.http.post( environment.url + '/project', this.postData).subscribe(responseData => {
      console.log(responseData);
    });
  }

  getProjects() {
    this.http.get(environment.url + '/projects').subscribe(responseData => {
      this.projects = responseData;
      console.log(responseData);
    });
  }

}
