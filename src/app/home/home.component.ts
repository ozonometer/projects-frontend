import {Component, OnInit} from '@angular/core';
import {ToastService} from '../service/toast.service';
import {ProjectModel} from '../model/ProjectModel';
import {HttpService} from '../service/http.service';
import {ToastWrapper} from '../model/ToastWrapper';
import {ToastType} from '../model/ToastType';
import {DataService} from '../service/data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
  })
  export class HomeComponent implements OnInit {
    projects: Array<ProjectModel>;

    constructor(private toastService: ToastService, private httpService: HttpService, private dataService: DataService,
                private router: Router) {
      this.toastService.clearToastMessages();
      httpService.getAllProject().then( response => {
        this.projects = response;
      }, error => {
        this.toastService.emmitToast(new ToastWrapper(ToastType.ERROR, error));
      });
    }

  ngOnInit(): void {
  }

  /**
   * When project elected in home page emit project to dataService and navigate to project (project detail) module
   */
  openProject(project: ProjectModel) {
      this.dataService.emitProject(project);
      this.router.navigate(['/project', project.id]).then( c => {});
  }
}
