import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpService} from '../service/http.service';
import {ImageModel} from '../model/ImageModel';
import {DatePipe} from '@angular/common';
import {ProjectDescription} from '../model/ProjectDescription';
import {ToastService} from '../service/toast.service';
import {FileModel} from '../model/FileModel';
import {ProjectModel} from '../model/ProjectModel';
import {ToastWrapper} from '../model/ToastWrapper';
import {ToastType} from '../model/ToastType';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  providers: [DatePipe]
})
export class AddComponent implements OnInit {

  todayDate;
  disableSave = false; // used to disable save while image being sent to be saved in google bucket

  newProject = new ProjectModel();

  constructor(private router: Router, private httpService: HttpService, private datePipe: DatePipe, private toastService: ToastService) {
    this.todayDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.toastService.clearToastMessages();
  }

  ngOnInit(): void {
    this.newProject.created = this.todayDate;
    this.newProject.updated = this.todayDate;
  }

  /**
   * On add image button click uploads image to bucket and saves returned url to newProject.images array as ImageModel object
   */
  addImage(event) {
    this.disableSave = event.target.files[0];
    let url = this.uploadFile(event.target.files[0], 'image');
    url.then(urlString => {
      let imageModel = new ImageModel(urlString,  null, event.target.files[0].name, this.todayDate);
      this.newProject.images.push(imageModel);
      this.toastService.emmitToast(new ToastWrapper(ToastType.INFO, {message: 'Image Uploaded'}));
    }, error => {
      this.toastService.emmitToast(new ToastWrapper(ToastType.ERROR, error));
    });
    this.disableSave = false;
  }

  /**
   * On add file button click uploads file to bucket and saves returned url to newProject.images array as ImageModel object
   */
  addFile(event) {
    this.disableSave = event.target.files[0];
    let response = this.uploadFile(event.target.files[0], 'file');
    response.then(urlString => {
      let fileModel = new FileModel(urlString,  null, event.target.files[0].name, this.todayDate);
      this.newProject.files.push(fileModel);
      this.toastService.emmitToast(new ToastWrapper(ToastType.INFO, {message: 'File Uploaded'}));
    }, error => {
      this.toastService.emmitToast(new ToastWrapper(ToastType.ERROR, error));
    });
    this.disableSave = false;
  }

  /**
   * On save button click sends new project to be saved by backend
   */
  save() {
    this.disableSave = true;
    this.newProject.projectDescription = new ProjectDescription(this.newProject.text, this.todayDate);
    this.httpService.postNewProject(this.newProject).then( project => {
      this.toastService.emmitToast(new ToastWrapper(ToastType.SUCCESS, project));
      this.disableSave = false;
      }, error => {
      this.toastService.emmitToast(new ToastWrapper(ToastType.ERROR, error));
      this.disableSave = false;
      }
    );
  }

  /**
   * On cancel button click navigate back to home page
   */
  cancel() {
    this.router.navigate(['./']).then(value => {
    });
  }

  /**
   * async method to retrieve saved image url from API
   */
  async uploadFile(file: File, type: string){
    return await this.httpService.uploadMultipartFile('/upload/' + type, file, type);
  }


}
