import {Component, OnInit} from '@angular/core';
import {ToastService} from '../service/toast.service';
import {ProjectModel} from '../model/ProjectModel';
import {HttpService} from '../service/http.service';
import {ToastWrapper} from '../model/ToastWrapper';
import {ToastType} from '../model/ToastType';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
  })
  export class HomeComponent implements OnInit {
    projects: Array<ProjectModel>;

    constructor(private toastService: ToastService, private httpService: HttpService) {
      this.toastService.clearToastMessages();
      httpService.getAllProject().then( response => {
        this.projects = response;
      }, error => {
        this.toastService.emmitToast(new ToastWrapper(ToastType.ERROR, error));
      });
    }

  ngOnInit(): void {
  }
}
