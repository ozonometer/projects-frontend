import {EventEmitter, Injectable} from '@angular/core';
import {ProjectModel} from '../model/ProjectModel';

@Injectable()
export class DataService {
  selectedProject = new EventEmitter<ProjectModel>();

  /**
   * Emits selected project to be displayed in detail in project component
   */
  emitProject(project: ProjectModel) {
    this.selectedProject.emit(project);
  }
}
