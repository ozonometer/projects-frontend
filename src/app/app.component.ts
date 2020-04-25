import { Component } from '@angular/core';
import {HttpService} from './service/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [HttpService]
})
export class AppComponent {

  constructor(private httpService: HttpService) {}

  fileToUpload: File = null;
  imageArray = [];

  postData = {
    created: '2020-04-19',
    updated: '2020-04-19',
    name: 'Test Pr 2',
    shortInfo: 'Awesome short description',
    projectDescription: []
  };

  projects = {};

  sendPost() {
    this.httpService.postRequest('/project', this.postData).subscribe(responseData => {
      console.log(responseData);
    });
  }

  getProjects() {
    this.httpService.getRequest('/projects').subscribe(response => {
      this.projects = response;
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

}
