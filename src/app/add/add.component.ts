import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../service/http.service';
import { ImageModel } from '../class/ImageModel';
import { DatePipe } from '@angular/common';
import {ProjectDescription} from '../class/ProjectDescription';
import {ToastService} from '../service/toast.service';
import {FileModel} from '../class/FileModel';
import {ProjectModel} from '../class/ProjectModel';


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
    }, error => {
      console.log(error);
      this.emmitToast(error);
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
    }, error => {
      console.log(error);
      this.emmitToast(error);
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
      this.emmitToast(project);
      this.disableSave = false;
      }, error => {
      this.emmitToast(error);
      this.disableSave = false;
      }
    );
  }

  /**
   * On cancel button click navigate back to home page
   */
  cancel() {
    this.router.navigate(['./']);
  }

  /**
   * async method to retrieve saved image url from API
   */
  async uploadFile(file: File, type: string){
    return await this.httpService.uploadMultipartFile('/upload/' + type, file, type);
  }

  /**
   * If API returns error or successful response emit response to toastMessage service
   */
  emmitToast(response: object) {
    console.log(response);
    this.toastService.toastMessage.emit(response);
  }

}
