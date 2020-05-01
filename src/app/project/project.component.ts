import {Component, Input, OnInit} from '@angular/core';
import {ProjectModel} from '../model/ProjectModel';
import {DataService} from '../service/data.service';
import {ActivatedRoute} from '@angular/router';
import {HttpService} from '../service/http.service';
import {ToastWrapper} from '../model/ToastWrapper';
import {ToastType} from '../model/ToastType';
import {ToastService} from '../service/toast.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html'
})
export class ProjectComponent implements OnInit{
  @Input()
  private id: number;
  private project: ProjectModel;

  /**
   * In constructor subscribe to dataService to receive selected project from home page.
   */
  constructor(private route: ActivatedRoute, private dataService: DataService, private httpService: HttpService,
              private toastService: ToastService) {
    this.dataService.selectedProject.subscribe(selected => {
        this.project = selected;
    });
  }

  /**
   * if user types in url manually with project id (/project/<projectId>) the on init get project from the backend.
   */
  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.id = +param['id'];
      if (this.id && !this.project) {
        this.httpService.getProject(this.id).then(response => {
          this.project = response;
        }, error => {
          this.toastService.emmitToast(new ToastWrapper(ToastType.ERROR, error));
        });
      }
    });
  }

}
